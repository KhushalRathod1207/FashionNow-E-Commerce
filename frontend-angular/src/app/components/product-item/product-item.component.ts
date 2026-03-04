import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a class='text-gray-700 cursor-pointer' [routerLink]="['/product', id]">
      <div class='overflow-hidden'>
        <img class='hover:scale-110 transition ease-in-out' [src]="image[0]" alt="" />
      </div>
      <p class='pt-3 pb-1 text-sm'>{{ name }}</p>
      <p class='text-sm font-medium'>{{ shopService.currency }}{{ price }}</p>
    </a>
  `,
  styles: []
})
export class ProductItemComponent {
  @Input() id!: string;
  @Input() image!: string[];
  @Input() name!: string;
  @Input() price!: number;

  constructor(public shopService: ShopService) {}
}
