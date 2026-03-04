import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../../components/title/title.component';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { assets } from '../../models/assets';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleComponent, ProductItemComponent],
  templateUrl: './collection.component.html',
  styles: []
})
export class CollectionComponent {
  assets = assets;
  showFilter = signal(false);
  category = signal<string[]>([]);
  subcategory = signal<string[]>([]);
  sortType = signal('relevent');

  filterProducts = computed(() => {
    let products = [...this.shopService.products()];
    
    if (this.shopService.showSearch() && this.shopService.search()) {
      products = products.filter(item => 
        item.name.toLowerCase().includes(this.shopService.search().toLowerCase())
      );
    }
    
    if (this.category().length > 0) {
      products = products.filter(item => this.category().includes(item.category));
    }
    
    if (this.subcategory().length > 0) {
      products = products.filter(item => this.subcategory().includes(item.subCategory));
    }

    const sort = this.sortType();
    if (sort === 'low-high') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
      products.sort((a, b) => b.price - a.price);
    }
    
    return products;
  });

  constructor(public shopService: ShopService) {}

  toggleCategory(value: string, checked: boolean) {
    if (checked) {
      this.category.set([...this.category(), value]);
    } else {
      this.category.set(this.category().filter(item => item !== value));
    }
  }

  toggleSubCategory(value: string, checked: boolean) {
    if (checked) {
      this.subcategory.set([...this.subcategory(), value]);
    } else {
      this.subcategory.set(this.subcategory().filter(item => item !== value));
    }
  }
}
