import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  currentState = signal<'Login' | 'Sign Up'>('Login');
  name = signal('');
  email = signal('');
  password = signal('');

  constructor(public shopService: ShopService) {
    effect(() => {
      if (this.shopService.token()) {
        this.shopService.router.navigate(['/']);
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (this.currentState() === 'Sign Up') {
      this.shopService.register(this.name(), this.email(), this.password()).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Registration successful! Please login.');
            this.currentState.set('Login');
            this.name.set('');
            this.password.set('');
          } else {
            alert(response.message);
          }
        },
        error: (error) => alert(error.message)
      });
    } else {
      this.shopService.login(this.email(), this.password()).subscribe({
        next: (response) => {
          if (response.success && response.token) {
            this.shopService.setToken(response.token, response.name, this.email());
          } else {
            alert(response.message);
          }
        },
        error: (error) => alert(error.message)
      });
    }
  }

  toggleState() {
    this.currentState.set(this.currentState() === 'Login' ? 'Sign Up' : 'Login');
  }
}
