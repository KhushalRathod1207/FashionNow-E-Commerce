import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartTotalComponent } from '../../components/cart-total/cart-total.component';
import { TitleComponent } from '../../components/title/title.component';
import { ShopService } from '../../services/shop.service';
import { assets } from '../../models/assets';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, FormsModule, CartTotalComponent, TitleComponent],
  templateUrl: './place-order.component.html',
  styles: []
})
export class PlaceOrderComponent {
  assets = assets;
  method = signal('cod');
  formData = signal({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  constructor(
    public shopService: ShopService,
    private http: HttpClient
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    const orderItems: any[] = [];
    const cart = this.shopService.cartItems();
    const products = this.shopService.products();

    for (const itemId in cart) {
      for (const size in cart[itemId]) {
        if (cart[itemId][size] > 0) {
          const itemInfo = products.find(p => p._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              size: size,
              quantity: cart[itemId][size]
            });
          }
        }
      }
    }

    const orderData = {
      address: this.formData(),
      items: orderItems,
      amount: this.shopService.cartAmount() + this.shopService.delivery_fee
    };

    const headers = new HttpHeaders({ 'token': this.shopService.token() });

    switch (this.method()) {
      case 'cod':
        this.http.post<any>(`${environment.backendUrl}/api/order/place`, orderData, { headers })
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.shopService.cartItems.set({});
                this.shopService.router.navigate(['/orders']);
              } else {
                alert(response.message);
              }
            },
            error: (error) => alert(error.message)
          });
        break;

      case 'stripe':
        this.http.post<any>(`${environment.backendUrl}/api/order/stripe`, orderData, { headers })
          .subscribe({
            next: (response) => {
              if (response.success) {
                window.location.replace(response.session_url);
              } else {
                alert(response.message);
              }
            },
            error: (error) => alert(error.message)
          });
        break;

      case 'razorpay':
        this.http.post<any>(`${environment.backendUrl}/api/order/razorpay`, orderData, { headers })
          .subscribe({
            next: (response) => {
              if (response.success) {
                this.initRazorpay(response.order);
              } else {
                alert(response.message);
              }
            },
            error: (error) => alert(error.message)
          });
        break;
    }
  }

  initRazorpay(order: any) {
    const options = {
      key: environment.razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      name: 'FashionNow',
      description: 'Order Payment',
      order_id: order.id,
      handler: (response: any) => {
        this.verifyRazorpayPayment(response.razorpay_order_id);
      },
      prefill: {
        name: `${this.formData().firstName} ${this.formData().lastName}`,
        email: this.formData().email,
        contact: this.formData().phone
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  verifyRazorpayPayment(orderId: string) {
    const headers = new HttpHeaders({ 'token': this.shopService.token() });
    this.http.post<any>(`${environment.backendUrl}/api/order/verifyRazorpay`, 
      { razorpay_order_id: orderId }, 
      { headers }
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.shopService.cartItems.set({});
          this.shopService.router.navigate(['/orders']);
        } else {
          alert('Payment verification failed');
        }
      },
      error: (error) => alert(error.message)
    });
  }
}
