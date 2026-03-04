import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { assets } from '../../models/assets';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent {
  assets = assets;
  image1 = signal<File | null>(null);
  image2 = signal<File | null>(null);
  image3 = signal<File | null>(null);
  image4 = signal<File | null>(null);
  
  name = signal('');
  description = signal('');
  price = signal('');
  category = signal('Men');
  subCategory = signal('Topwear');
  bestseller = signal(false);
  sizes = signal<string[]>([]);

  constructor(private adminService: AdminService) {}

  onFileChange(event: any, imageNum: number) {
    const file = event.target.files[0];
    if (file) {
      switch(imageNum) {
        case 1: this.image1.set(file); break;
        case 2: this.image2.set(file); break;
        case 3: this.image3.set(file); break;
        case 4: this.image4.set(file); break;
      }
    }
  }

  getImageUrl(image: File | null): string {
    return image ? URL.createObjectURL(image) : assets.upload_area;
  }

  toggleSize(size: string) {
    const currentSizes = this.sizes();
    if (currentSizes.includes(size)) {
      this.sizes.set(currentSizes.filter(s => s !== size));
    } else {
      this.sizes.set([...currentSizes, size]);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', this.name());
    formData.append('description', this.description());
    formData.append('price', this.price());
    formData.append('category', this.category());
    formData.append('subCategory', this.subCategory());
    formData.append('sizes', JSON.stringify(this.sizes()));
    formData.append('bestseller', this.bestseller().toString());
    
    if (this.image1()) formData.append('image1', this.image1()!);
    if (this.image2()) formData.append('image2', this.image2()!);
    if (this.image3()) formData.append('image3', this.image3()!);
    if (this.image4()) formData.append('image4', this.image4()!);

    this.adminService.addProduct(formData).subscribe({
      next: (response) => {
        if (response.success) {
          alert(response.message);
          this.resetForm();
        } else {
          alert(response.message);
        }
      },
      error: (error) => alert(error.message)
    });
  }

  resetForm() {
    this.name.set('');
    this.description.set('');
    this.price.set('');
    this.image1.set(null);
    this.image2.set(null);
    this.image3.set(null);
    this.image4.set(null);
    this.sizes.set([]);
    this.bestseller.set(false);
  }
}
