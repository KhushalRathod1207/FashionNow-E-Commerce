import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product, ProductResponse, CartItems, CartResponse, AuthResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  currency = '₹';
  delivery_fee = 10;
  backendUrl = environment.backendUrl;

  products = signal<Product[]>([]);
  cartItems = signal<CartItems>({});
  token = signal<string>('');
  userName = signal<string>('');
  userEmail = signal<string>('');
  search = signal<string>('');
  showSearch = signal<boolean>(false);

  cartCount = computed(() => {
    let totalCount = 0;
    const cart = this.cartItems();
    for (const itemId in cart) {
      for (const size in cart[itemId]) {
        if (cart[itemId][size] > 0) {
          totalCount += cart[itemId][size];
        }
      }
    }
    return totalCount;
  });

  cartAmount = computed(() => {
    let totalAmount = 0;
    const cart = this.cartItems();
    const prods = this.products();
    for (const itemId in cart) {
      const itemInfo = prods.find(p => p._id === itemId);
      if (itemInfo) {
        for (const size in cart[itemId]) {
          if (cart[itemId][size] > 0) {
            totalAmount += itemInfo.price * cart[itemId][size];
          }
        }
      }
    }
    return totalAmount;
  });

  constructor(private http: HttpClient, public router: Router) {
    if (this.isBrowser) {
      this.loadToken();
      this.getProductData();
    }
  }

  private loadToken() {
    if (this.isBrowser) {
      const savedToken = localStorage.getItem('token');
      const savedName = localStorage.getItem('userName');
      const savedEmail = localStorage.getItem('userEmail');
      if (savedToken) {
        this.token.set(savedToken);
        this.userName.set(savedName || '');
        this.userEmail.set(savedEmail || '');
        this.getUserCart(savedToken);
        if (!savedName || !savedEmail) {
          this.getUserData(savedToken);
        }
      }
    }
  }

  getProductData() {
    this.http.get<ProductResponse>(`${this.backendUrl}/api/product/list`).subscribe({
      next: (response) => {
        if (response.success) {
          this.products.set(response.products);
        }
      },
      error: (error) => console.error(error)
    });
  }

  addToCart(itemId: string, size: string) {
    if (!size) {
      alert('Select Product Size');
      return;
    }

    const cart = { ...this.cartItems() };
    if (!cart[itemId]) cart[itemId] = {};
    cart[itemId][size] = (cart[itemId][size] || 0) + 1;
    this.cartItems.set(cart);

    if (this.token()) {
      const headers = new HttpHeaders({ 'token': this.token() });
      this.http.post(`${this.backendUrl}/api/cart/add`, { itemId, size }, { headers }).subscribe();
    }
  }

  updateQuantity(itemId: string, size: string, quantity: number) {
    const cart = { ...this.cartItems() };
    cart[itemId][size] = quantity;
    this.cartItems.set(cart);

    if (this.token()) {
      const headers = new HttpHeaders({ 'token': this.token() });
      this.http.post(`${this.backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers }).subscribe();
    }
  }

  getUserCart(token: string) {
    const headers = new HttpHeaders({ 'token': token });
    this.http.post<CartResponse>(`${this.backendUrl}/api/cart/get`, {}, { headers }).subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItems.set(response.cartData);
        }
      }
    });
  }

  getUserData(token: string) {
    const headers = new HttpHeaders({ 'token': token });
    this.http.post<any>(`${this.backendUrl}/api/user/data`, {}, { headers }).subscribe({
      next: (response) => {
        if (response.success && response.user) {
          this.userName.set(response.user.name);
          this.userEmail.set(response.user.email);
          if (this.isBrowser) {
            localStorage.setItem('userName', response.user.name);
            localStorage.setItem('userEmail', response.user.email);
          }
        }
      }
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.backendUrl}/api/user/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.backendUrl}/api/user/register`, { name, email, password });
  }

  setToken(token: string, name?: string, email?: string) {
    this.token.set(token);
    if (name) this.userName.set(name);
    if (email) this.userEmail.set(email);
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      if (name) localStorage.setItem('userName', name);
      if (email) localStorage.setItem('userEmail', email);
    }
    this.getUserCart(token);
  }

  logout() {
    this.token.set('');
    this.userName.set('');
    this.userEmail.set('');
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    }
    this.cartItems.set({});
    this.router.navigate(['/login']);
  }
}
