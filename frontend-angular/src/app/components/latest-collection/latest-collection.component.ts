import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../title/title.component';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-latest-collection',
  standalone: true,
  imports: [CommonModule, TitleComponent, ProductItemComponent],
  template: `
    <div class='my-10'>
      <div class='text-center py-8 text-3xl'>
        <app-title text1="LATEST" text2="COLLECTIONS"></app-title>
        <p class='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div class='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        @for (item of latestProducts(); track item._id) {
          <app-product-item 
            [id]="item._id" 
            [image]="item.image" 
            [name]="item.name" 
            [price]="item.price">
          </app-product-item>
        }
      </div>
    </div>
  `,
  styles: []
})
export class LatestCollectionComponent {
  latestProducts = computed(() => this.shopService.products().slice(0, 10));

  constructor(public shopService: ShopService) {}
}
