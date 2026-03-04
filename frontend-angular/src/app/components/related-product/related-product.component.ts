import { Component, Input, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../title/title.component';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-related-product',
  standalone: true,
  imports: [CommonModule, TitleComponent, ProductItemComponent],
  template: `
    <div class='my-24'>
      <div class='text-3xl py-2'>
        <app-title text1="RELATED" text2="PRODUCT"></app-title>
        <div class='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          @for (item of relatedProducts(); track item._id) {
            <app-product-item 
              [id]="item._id" 
              [image]="item.image" 
              [name]="item.name" 
              [price]="item.price">
            </app-product-item>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RelatedProductComponent {
  @Input() category!: string;
  @Input() subCategory!: string;

  relatedProducts = computed(() => {
    if (!this.category || !this.subCategory) return [];
    
    return this.shopService.products()
      .filter(item => item.category === this.category && item.subCategory === this.subCategory)
      .slice(0, 5);
  });

  constructor(public shopService: ShopService) {}
}
