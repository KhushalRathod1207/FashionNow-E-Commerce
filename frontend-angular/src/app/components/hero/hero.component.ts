import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='flex flex-col sm:flex-row border border-gray-400'>
      <div class='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div class='text-[#414141]'>
          <div class='flex items-center gap-2'>
            <p class='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p class='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 class='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div class='flex items-center gap-2'>
            <p class='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p class='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <img class='w-full sm:w-1/2' [src]="assets.hero_img" alt="Hero" />
    </div>
  `,
  styles: []
})
export class HeroComponent {
  assets = assets;
}
