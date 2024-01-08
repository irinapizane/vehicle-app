import { TestBed } from '@angular/core/testing';

import { VehicleDiscountCalculationService } from './vehicle-discount-calculation.service';

describe('VehicleDiscountCalculationService', () => {
  let service: VehicleDiscountCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleDiscountCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not apply discount for prices below 15000', () => {
    expect(service.calculateDiscount(10000, false)).toBe(0);
    expect(service.calculateDiscount(14999, true)).toBe(0);
  });

  it('should apply a 5% discount for VIP clients with price >= 15000 and < 20000', () => {
    expect(service.calculateDiscount(15000, true)).toBe(750);
    expect(service.calculateDiscount(18000, true)).toBe(900);
  });

  it('should not apply a 5% discount for non-VIP clients with price >= 15000 and < 20000', () => {
    expect(service.calculateDiscount(15000, false)).toBe(0);
    expect(service.calculateDiscount(18000, false)).toBe(0);
  });

  it('should apply a 7% discount for prices >= 20000, regardless of VIP status', () => {
    expect(service.calculateDiscount(20000, false)).toBe(1400);
    expect(service.calculateDiscount(25000, true)).toBe(1750);
  });
});
