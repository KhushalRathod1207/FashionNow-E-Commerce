import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../models/product.model';
import { assets } from '../../models/assets';
import { RelatedProductComponent } from '../../components/related-product/related-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RelatedProductComponent],
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  assets = assets;
  product = signal<Product | null>(null);
  selectedImage = signal('');
  selectedSize = signal('');

  constructor(
    private route: ActivatedRoute,
    public shopService: ShopService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      const prod = this.shopService.products().find(p => p._id === productId);
      if (prod) {
        this.product.set(prod);
        this.selectedImage.set(prod.image[0]);
      }
    }
  }

  addToCart() {
    if (this.product() && this.selectedSize()) {
      this.shopService.addToCart(this.product()!._id, this.selectedSize());
    }
  }
}
