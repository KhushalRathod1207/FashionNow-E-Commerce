import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='border-t pt-16'>
      <div class='text-2xl mb-8'>
        <h1 class='text-3xl font-semibold'>My Profile</h1>
      </div>
      
      <div class='max-w-2xl'>
        <div class='bg-white shadow-md rounded-lg p-6'>
          <div class='mb-6'>
            <h2 class='text-xl font-semibold mb-4'>Account Information</h2>
            <div class='space-y-3'>
              <div class='flex items-center gap-3'>
                <span class='font-medium text-gray-600'>Name:</span>
                <span class='font-semibold'>{{ shopService.userName() || 'User' }}</span>
              </div>
              <div class='flex items-center gap-3'>
                <span class='font-medium text-gray-600'>Email:</span>
                <span>{{ shopService.userEmail() || 'Not available' }}</span>
              </div>
              <div class='flex items-center gap-3'>
                <span class='font-medium text-gray-600'>Status:</span>
                <span class='text-green-600 font-semibold'>Active</span>
              </div>
              <div class='flex items-center gap-3'>
                <span class='font-medium text-gray-600'>Member Since:</span>
                <span>{{ getCurrentDate() }}</span>
              </div>
            </div>
          </div>

          <div class='border-t pt-6'>
            <h3 class='text-lg font-semibold mb-4'>Quick Actions</h3>
            <div class='space-y-3'>
              <button 
                (click)="shopService.router.navigate(['/orders'])"
                class='w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors'>
                View My Orders
              </button>
              <button 
                (click)="shopService.router.navigate(['/cart'])"
                class='w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors'>
                View Shopping Cart
              </button>
              <button 
                (click)="shopService.router.navigate(['/collection'])"
                class='w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors'>
                Continue Shopping
              </button>
            </div>
          </div>

          <div class='border-t pt-6 mt-6'>
            <button 
              (click)="shopService.logout()"
              class='w-full bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition-colors'>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileComponent {
  constructor(public shopService: ShopService) {}

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
