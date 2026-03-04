import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  backendUrl = environment.backendUrl;
  currency = environment.currency;
  token = signal<string>('');

  constructor(private http: HttpClient, public router: Router) {
    if (this.isBrowser) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        this.token.set(savedToken);
      }
    }
  }

  setToken(token: string) {
    this.token.set(token);
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  logout() {
    this.token.set('');
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.backendUrl}/api/user/admin`, { email, password });
  }

  addProduct(formData: FormData) {
    const headers = new HttpHeaders({ 'token': this.token() });
    return this.http.post<any>(`${this.backendUrl}/api/product/add`, formData, { headers });
  }

  getProducts() {
    return this.http.get<any>(`${this.backendUrl}/api/product/list`);
  }

  removeProduct(id: string) {
    const headers = new HttpHeaders({ 'token': this.token() });
    return this.http.post<any>(`${this.backendUrl}/api/product/remove`, { id }, { headers });
  }

  getOrders() {
    const headers = new HttpHeaders({ 'token': this.token() });
    return this.http.post<any>(`${this.backendUrl}/api/order/list`, {}, { headers });
  }

  updateOrderStatus(orderId: string, status: string) {
    const headers = new HttpHeaders({ 'token': this.token() });
    return this.http.post<any>(`${this.backendUrl}/api/order/status`, { orderId, status }, { headers });
  }
}
