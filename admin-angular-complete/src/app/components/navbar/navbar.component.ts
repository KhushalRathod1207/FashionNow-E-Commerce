import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='flex items-center justify-between py-2 px-[4%]'>
      <img class='w-[max(10%,80px)]' [src]="assets.logo" alt="Logo" />
      <button 
        (click)="logout()" 
        class='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  `,
  styles: []
})
export class NavbarComponent {
  assets = assets;

  constructor(private adminService: AdminService) {}

  logout() {
    this.adminService.logout();
    window.location.reload();
  }
}
