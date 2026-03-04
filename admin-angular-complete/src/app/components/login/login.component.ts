import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class='min-h-screen flex items-center justify-center w-full'>
      <div class='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 class='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form (ngSubmit)="onSubmit($event)">
          <div class='mb-3 min-w-72'>
            <p class='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input 
              [(ngModel)]="email" 
              name="email"
              class='rounded w-full px-3 py-2 border border-gray-300 outline-none' 
              type="email" 
              placeholder='Your@email.com' 
              required
            />
          </div>
          <div class='mb-3 min-w-72'>
            <p class='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input 
              [(ngModel)]="password" 
              name="password"
              class='rounded w-full px-3 py-2 border border-gray-300 outline-none' 
              type="password" 
              placeholder='Enter Your Password' 
              required
            />
          </div>
          <button class='mt-2 w-full px-4 py-2 rounded-md text-white bg-black' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email = signal('');
  password = signal('');

  constructor(private adminService: AdminService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.adminService.login(this.email(), this.password()).subscribe({
      next: (response) => {
        if (response.success) {
          this.adminService.setToken(response.token);
          window.location.reload();
        } else {
          alert(response.message);
        }
      },
      error: (error) => alert(error.message)
    });
  }
}
