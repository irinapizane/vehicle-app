import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleDiscountCalculationService } from './services/vehicle-discount-calculation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vehicle-app';
  discountForm!: FormGroup;
  discount: number = 0;
  finalPrice: number = 0;

  constructor(
    private vehicleDiscountCalculationService: VehicleDiscountCalculationService
  ) {}

  ngOnInit() {
    this.discountForm = new FormGroup({
      price: new FormControl(0),
      isVip: new FormControl(false),
    });
  }

  calculateDiscount() {
    const price = this.discountForm.value.price;
    const isVip = this.discountForm.value.isVip;
    this.discount = this.vehicleDiscountCalculationService.calculateDiscount(
      price,
      isVip
    );
    this.finalPrice = price - this.discount;
  }
}
