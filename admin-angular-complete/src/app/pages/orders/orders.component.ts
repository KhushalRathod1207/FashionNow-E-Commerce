import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../models/product.model';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h3 class="text-xl font-semibold mb-4">Order Management</h3>
      <div>
        @for (order of orders(); track order._id) {
          <div class='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg hover:shadow-md'>
            <img class='w-12' [src]="assets.parcel_icon" alt='parcel icon' />
            <div>
              <div class="mb-2">
                @for (item of order.items; track $index; let last = $last) {
                  <p class='py-0.5'>
                    {{ item.name }} x {{ item.quantity }} <span class="text-gray-500">({{ item.size }})</span>{{ !last ? ',' : '' }}
                  </p>
                }
              </div>
              <p class='mt-3 mb-2 font-semibold text-base'>{{ order.address.firstName }} {{ order.address.lastName }}</p>
              <div class="text-gray-600">
                <p>{{ order.address.street }},</p>
                <p>{{ order.address.city }}, {{ order.address.state }}, {{ order.address.country }}, {{ order.address.zipCode }}</p>
              </div>
              <p class="mt-2 font-medium">{{ order.address.phone }}</p>
            </div>
            <div>
              <p class='text-sm sm:text-[15px] mb-2'><span class="font-semibold">Items:</span> {{ order.items.length }}</p>
              <p class='mb-1'><span class="font-semibold">Method:</span> {{ order.paymentMethod }}</p>
              <p class='mb-1'><span class="font-semibold">Payment:</span> <span [class]="order.payment ? 'text-green-600 font-semibold' : 'text-orange-600'">{{ order.payment ? 'Done' : 'Pending' }}</span></p>
              <p><span class="font-semibold">Date:</span> {{ formatDate(order.date) }}</p>
            </div>
            <p class='text-sm sm:text-[15px] font-bold text-lg'>{{ adminService.currency }}{{ order.amount }}</p>
            <select 
              [(ngModel)]="order.status"
              (change)="statusHandler(order._id, order.status)" 
              class='p-2 font-semibold border border-gray-300 rounded bg-white'
              [class.bg-red-50]="order.status === 'Cancelled'"
              [class.text-red-600]="order.status === 'Cancelled'">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        } @empty {
          <div class="text-center py-8 text-gray-500">
            <p>No orders found</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class OrdersComponent implements OnInit {
  assets = assets;
  orders = signal<Order[]>([]);

  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    if (!this.adminService.token()) return;

    this.adminService.getOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders.set(response.orders.reverse());
        } else {
          alert(response.message);
        }
      },
      error: (error) => alert(error.message)
    });
  }

  statusHandler(orderId: string, status: string) {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: (response) => {
        if (response.success) {
          this.fetchAllOrders();
        }
      },
      error: (error) => alert(error.message)
    });
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
  }
}
