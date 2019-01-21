import { CurrencyPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";

import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
registerLocaleData(localeCs, localeCsExtra);

import { environment } from "../environments/environment";
import { AppEffects } from "./store/app.effects";
import { AppComponent } from './app.component';
import { reducer } from "./store/app.reducer";
import { AverageLoanComponent } from './components/average-loan/average-loan.component';
import { AverageAmountPipe } from './pipes/average-amount/average-amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AverageLoanComponent,
    AverageAmountPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Store
    StoreModule.forRoot({app: reducer}, {metaReducers: !environment.production ? [storeFreeze] : []}),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [CurrencyPipe, AverageAmountPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
