import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class='text-center'>
      <p class='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p class='text-gray-400 mt-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form (ngSubmit)="onSubmit($event)" class='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input 
          class='w-full sm:flex-1 outline-none' 
          type="email" 
          placeholder='Enter your email' 
          required 
        />
        <button type='submit' class='bg-black text-white text-xs px-10 py-4'>
          SUBSCRIBE
        </button>
      </form>
    </div>
  `,
  styles: []
})
export class NewsletterComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    alert('Subscribed!');
  }
}
