import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopService } from '../../services/shop.service';
import { TitleComponent } from '../../components/title/title.component';
import { environment } from '../../../environments/environment';

interface OrderItem {
  _id: string;
  orderId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string[];
  status: string;
  payment: boolean;
  paymentMethod: string;
  date: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderData = signal<OrderItem[]>([]);

  constructor(
    public shopService: ShopService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadOrderData();
  }

  loadOrderData() {
    if (!this.shopService.token()) return;

    const headers = new HttpHeaders({ 'token': this.shopService.token() });
    this.http.post<any>(`${environment.backendUrl}/api/order/userorders`, {}, { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            const allOrdersItem: OrderItem[] = [];
            response.orders.forEach((order: any) => {
              order.items.forEach((item: any) => {
                allOrdersItem.push({
                  ...item,
                  orderId: order._id,
                  status: order.status,
                  payment: order.payment,
                  paymentMethod: order.paymentMethod,
                  date: order.date
                });
              });
            });
            this.orderData.set(allOrdersItem.reverse());
          }
        },
        error: (error) => console.error(error)
      });
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toDateString();
  }

  canCancelOrder(orderDate: number): boolean {
    const hoursSinceOrder = (Date.now() - orderDate) / (1000 * 60 * 60);
    return hoursSinceOrder < 24;
  }

  cancelOrder(orderId: string) {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    const headers = new HttpHeaders({ 'token': this.shopService.token() });
    this.http.post<any>(`${environment.backendUrl}/api/order/cancel`, { orderId }, { headers })
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('Order cancelled successfully');
            this.loadOrderData();
          } else {
            alert(response.message);
          }
        },
        error: (error) => alert(error.message)
      });
  }
}
