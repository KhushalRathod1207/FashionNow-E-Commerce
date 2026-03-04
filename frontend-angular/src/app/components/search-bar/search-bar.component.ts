import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (shopService.showSearch()) {
      <div class='border-t border-b bg-gray-50 text-center'>
        <div class='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input 
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange($event)"
            class='flex-1 outline-none bg-inherit text-sm' 
            type="text" 
            placeholder='Search' 
          />
          <img class='w-4' [src]="assets.search_icon" alt="Search" />
        </div>
        <img 
          (click)="shopService.showSearch.set(false)" 
          class='inline w-3 cursor-pointer' 
          [src]="assets.cross_icon" 
          alt="Close" 
        />
      </div>
    }
  `,
  styles: []
})
export class SearchBarComponent {
  assets = assets;
  searchValue = '';

  constructor(public shopService: ShopService) {}

  onSearchChange(value: string) {
    this.shopService.search.set(value);
  }
}
