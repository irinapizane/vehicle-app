import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleDiscountCalculationService } from './services/vehicle-discount-calculation.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: VehicleDiscountCalculationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, AppComponent],
      providers: [VehicleDiscountCalculationService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(VehicleDiscountCalculationService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'vehicle-app' title`, () => {
    expect(component.title).toEqual('vehicle-app');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Vehicle Discount Calculation');
  });

  it('should initialize the discountForm', () => {
    expect(component.discountForm instanceof FormGroup).toBe(true);
    expect(component.discountForm.controls['price'].value).toBe(0);
    expect(component.discountForm.controls['isVip'].value).toBe(false);
  });

  it('should calculate discount correctly', () => {
    spyOn(service, 'calculateDiscount').and.callThrough();

    component.discountForm.controls['price'].setValue(20000);
    component.discountForm.controls['isVip'].setValue(true);
    component.calculateDiscount();

    expect(service.calculateDiscount).toHaveBeenCalledWith(20000, true);
    expect(component.discount).toBe(1400);  // 7% of 20000
    expect(component.finalPrice).toBe(18600); // 20000 - 1400
  });
});
