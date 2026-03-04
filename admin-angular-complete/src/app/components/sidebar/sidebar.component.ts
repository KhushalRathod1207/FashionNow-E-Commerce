import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class='w-[18%] min-h-screen border-r-2 border-gray-300'>
      <div class='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <a 
          routerLink="/" 
          routerLinkActive="bg-pink-100 border-pink-400"
          [routerLinkActiveOptions]="{exact: true}"
          class="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-colors">
          <img class='w-5 h-5' [src]="assets.order_icon" alt="List" />
          <p class='hidden md:block'>List Items</p>
        </a>
        <a 
          routerLink="/add" 
          routerLinkActive="bg-pink-100 border-pink-400"
          class="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-colors">
          <img class='w-5 h-5' [src]="assets.add_icon" alt="Add" />
          <p class='hidden md:block'>Add Items</p>
        </a>
        <a 
          routerLink="/orders" 
          routerLinkActive="bg-pink-100 border-pink-400"
          class="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l hover:bg-gray-50 transition-colors">
          <img class='w-5 h-5' [src]="assets.order_icon" alt="Orders" />
          <p class='hidden md:block'>Orders</p>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class SidebarComponent {
  assets = assets;
}
