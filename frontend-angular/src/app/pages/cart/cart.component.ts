import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../../components/title/title.component';
import { CartTotalComponent } from '../../components/cart-total/cart-total.component';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, TitleComponent, CartTotalComponent],
  template: `
    <div class='border-t pt-14'>
      <div class='text-2xl mb-3'>
        <app-title text1="YOUR" text2="CART"></app-title>
      </div>

      <div>
        @for (itemId of getCartItemIds(); track itemId) {
          @for (size of getItemSizes(itemId); track size) {
            @if (shopService.cartItems()[itemId][size] > 0) {
              @for (product of [getProduct(itemId)]; track product?._id) {
                @if (product) {
                  <div class='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                    <div class='flex items-start gap-6'>
                      <img class='w-16 sm:w-20' [src]="product.image[0]" alt="" />
                      <div>
                        <p class='text-xs sm:text-lg font-medium'>{{ product.name }}</p>
                        <div class='flex items-center gap-5 mt-2'>
                          <p>{{ shopService.currency }}{{ product.price }}</p>
                          <p class='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{{ size }}</p>
                        </div>
                      </div>
                    </div>
                    <input 
                      class='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                      type="number" 
                      min="1" 
                      [value]="shopService.cartItems()[itemId][size]"
                      (change)="updateQuantity(itemId, size, $any($event.target).value)"
                    />
                    <img 
                      (click)="updateQuantity(itemId, size, 0)" 
                      class='w-4 mr-4 sm:w-5 cursor-pointer' 
                      [src]="assets.bin_icon" 
                      alt="Remove" 
                    />
                  </div>
                }
              }
            }
          }
        }
      </div>

      <div class='flex justify-end my-20'>
        <div class='w-full sm:w-[450px]'>
          <app-cart-total></app-cart-total>
          <div class='w-full text-end'>
            <button 
              routerLink="/place-order" 
              class='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent {
  assets = assets;

  constructor(public shopService: ShopService) {}

  getCartItemIds() {
    return Object.keys(this.shopService.cartItems());
  }

  getItemSizes(itemId: string) {
    return Object.keys(this.shopService.cartItems()[itemId] || {});
  }

  getProduct(itemId: string) {
    return this.shopService.products().find(p => p._id === itemId);
  }

  updateQuantity(itemId: string, size: string, quantity: number) {
    this.shopService.updateQuantity(itemId, size, Number(quantity));
  }
}
