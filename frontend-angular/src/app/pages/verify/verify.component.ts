import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopService } from '../../services/shop.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class='border-t pt-16 min-h-[60vh] flex items-center justify-center'>
      <div class='text-center'>
        <div class='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
        <p class='mt-4 text-gray-600'>Verifying your payment...</p>
      </div>
    </div>
  `,
  styles: []
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.verifyPayment();
  }

  verifyPayment() {
    const success = this.route.snapshot.queryParamMap.get('success');
    const orderId = this.route.snapshot.queryParamMap.get('orderID');

    if (!this.shopService.token()) {
      this.shopService.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({ 'token': this.shopService.token() });
    this.http.post<any>(
      `${environment.backendUrl}/api/order/verifyStripe`,
      { success, orderId },
      { headers }
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.shopService.cartItems.set({});
          this.shopService.router.navigate(['/orders']);
        } else {
          this.shopService.router.navigate(['/cart']);
        }
      },
      error: (error) => {
        console.error(error);
        this.shopService.router.navigate(['/cart']);
      }
    });
  }
}
