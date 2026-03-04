import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TitleComponent, NewsletterComponent],
  template: `
    <div class='text-2xl text-center pt-8 border-t'>
      <app-title text1="ABOUT" text2="US"></app-title>
    </div>

    <div class='my-10 flex flex-col md:flex-row gap-16'>
      <img class='w-full md:max-w-[450px]' [src]="assets.about_img" alt="About" />
      <div class='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>FashionNow was born out of a passion for innovation and a desire to revolutionize the way people shop online.</p>
        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products.</p>
        <b class='text-gray-800'>Our Mission</b>
        <p>Our mission is to empower customers with choice, convenience, and confidence.</p>
      </div>
    </div>

    <div class='text-xl py-4'>
      <app-title text1="WHY" text2="CHOOSE US"></app-title>
    </div>

    <div class='flex flex-col md:flex-row text-sm mb-20'>
      <div class='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p class='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
      </div>
      <div class='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p class='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
      </div>
      <div class='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p class='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way.</p>
      </div>
    </div>

    <app-newsletter></app-newsletter>
  `,
  styles: []
})
export class AboutComponent {
  assets = assets;
}
