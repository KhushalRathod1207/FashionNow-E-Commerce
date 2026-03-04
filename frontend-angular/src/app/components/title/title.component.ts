import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='inline-flex gap-2 items-center mb-3'>
      <p class='text-gray-500'>{{ text1 }} <span class='text-gray-700 font-medium'>{{ text2 }}</span></p>
      <p class='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  `,
  styles: []
})
export class TitleComponent {
  @Input() text1!: string;
  @Input() text2!: string;
}
