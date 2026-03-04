import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p class='mb-4 text-xl font-semibold'>All Products List</p>
      <div class='flex flex-col gap-2'>
        <div class='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-3 border bg-gray-100 text-sm font-semibold'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b class="text-center">Action</b>
        </div>

        @for (item of list(); track item._id) {
          <div class='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-2 border text-sm hover:bg-gray-50'>
            <img class='w-12 h-12 object-cover rounded' [src]="item.image[0]" alt="Product" />
            <p class="font-medium">{{ item.name }}</p>
            <p>{{ item.category }}</p>
            <p class="font-semibold">{{ adminService.currency }}{{ item.price }}</p>
            <p class='text-right md:text-center cursor-pointer text-xl text-red-500 hover:text-red-700' (click)="removeProduct(item._id)">×</p>
          </div>
        } @empty {
          <div class="text-center py-8 text-gray-500">
            <p>No products found</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ListComponent implements OnInit {
  list = signal<Product[]>([]);

  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.fetchList();
  }

  fetchList() {
    this.adminService.getProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.list.set(response.products);
        } else {
          alert(response.message);
        }
      },
      error: (error) => alert(error.message)
    });
  }

  removeProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.removeProduct(id).subscribe({
        next: (response) => {
          if (response.success) {
            alert(response.message);
            this.fetchList();
          } else {
            alert(response.message);
          }
        },
        error: (error) => alert(error.message)
      });
    }
  }
}
