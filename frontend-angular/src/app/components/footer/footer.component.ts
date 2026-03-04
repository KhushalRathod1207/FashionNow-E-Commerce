import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img [src]="assets.logo" class='mb-5 w-32' alt="Logo" />
        <p class='w-full md:w-2/3 text-gray-600'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div>
        <p class='text-xl font-medium mb-5'>COMPANY</p>
        <ul class='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div>
        <p class='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul class='flex flex-col gap-1 text-gray-600'>
          <li>+1-212-456-7890</li>
          <li>contact&#64;fashionnow.com</li>
        </ul>
      </div>
    </div>

    <div>
      <hr />
      <p class='py-5 text-sm text-center'>Copyright 2024&#64; fashionnow.com - All Right Reserved.</p>
    </div>
  `,
  styles: []
})
export class FooterComponent {
  assets = assets;
}
