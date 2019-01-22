import { CurrencyPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../environments/environment";
import { AppComponent } from './app.component';
import { AverageLoanComponent } from "./components/average-loan/average-loan.component";
import { AverageAmountPipe } from "./pipes/average-amount/average-amount.pipe";
import { AppEffects } from "./store/app.effects";
import { reducer } from "./store/app.reducer";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        // Store
        StoreModule.forRoot({app: reducer}),
        EffectsModule.forRoot([AppEffects]),
      ],
      declarations: [
        AppComponent,
        AverageLoanComponent,
        AverageAmountPipe
      ],
      providers: [CurrencyPipe, AverageAmountPipe]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render AverageLoan component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-average-loan').length).toBe(1);
  });
});
