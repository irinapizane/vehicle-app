import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleDiscountCalculationService {
  calculateDiscount(price: number, isVip: boolean): number {
    let discount = 0;

    if (price < 15000) {
      discount = 0;
    } else if (price >= 15000 && price < 20000 && isVip) {
      discount = price * 0.05;
    } else if (price >= 20000) {
      discount = price * 0.07;
    }

    return Math.round(discount * 100) / 100;
  }
}
