import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { LatestCollectionComponent } from '../../components/latest-collection/latest-collection.component';
import { BestSellerComponent } from '../../components/best-seller/best-seller.component';
import { OurPolicyComponent } from '../../components/our-policy/our-policy.component';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    LatestCollectionComponent,
    BestSellerComponent,
    OurPolicyComponent,
    NewsletterComponent
  ],
  template: `
    <div>
      <app-hero></app-hero>
      <app-latest-collection></app-latest-collection>
      <app-best-seller></app-best-seller>
      <app-our-policy></app-our-policy>
      <app-newsletter></app-newsletter>
    </div>
  `,
  styles: []
})
export class HomeComponent {}
