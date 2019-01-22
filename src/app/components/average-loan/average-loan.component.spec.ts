import { CurrencyPipe } from "@angular/common";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { AverageAmountPipe } from "../../pipes/average-amount/average-amount.pipe";

import { AverageLoanComponent } from './average-loan.component';

describe('AverageLoanComponent', () => {
  let component: AverageLoanComponent;
  let fixture: ComponentFixture<AverageLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AverageLoanComponent, AverageAmountPipe],
      providers: [CurrencyPipe, AverageAmountPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageLoanComponent);
    component = fixture.componentInstance;
    component.loading = false;
    component.loans = [];
    component.ratings = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
