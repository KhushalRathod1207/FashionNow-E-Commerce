import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-our-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img [src]="assets.exchange_icon" class='w-12 m-auto mb-5' alt="Exchange" />
        <p class='font-semibold'>Easy Exchange Policy</p>
        <p class='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
      <div>
        <img [src]="assets.quality_icon" class='w-12 m-auto mb-5' alt="Quality" />
        <p class='font-semibold'>7 Days Return Policy</p>
        <p class='text-gray-400'>We provide 7 days free return policy</p>
      </div>
      <div>
        <img [src]="assets.support_img" class='w-12 m-auto mb-5' alt="Support" />
        <p class='font-semibold'>Best customer support</p>
        <p class='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  `,
  styles: []
})
export class OurPolicyComponent {
  assets = assets;
}
