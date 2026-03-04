import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <div class='w-full'>
      <div class='text-2xl'>
        <app-title text1="CART" text2="TOTALS"></app-title>
      </div>

      <div class='flex flex-col gap-2 mt-2 text-sm'>
        <div class='flex justify-between'>
          <p>Subtotal</p>
          <p>{{ shopService.currency }} {{ shopService.cartAmount() }}.00</p>
        </div>
        <hr />
        <div class='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{{ shopService.currency }} {{ shopService.delivery_fee }}.00</p>
        </div>
        <hr />
        <div class='flex justify-between'>
          <b>Total</b>
          <b>{{ shopService.currency }} {{ shopService.cartAmount() === 0 ? 0 : shopService.cartAmount() + shopService.delivery_fee }}.00</b>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartTotalComponent {
  constructor(public shopService: ShopService) {}
}
