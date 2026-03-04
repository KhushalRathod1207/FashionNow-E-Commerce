import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  visible = signal(false);
  assets = assets;

  constructor(public shopService: ShopService) {}

  toggleMenu() {
    this.visible.set(!this.visible());
  }

  closeMenu() {
    this.visible.set(false);
  }
}
