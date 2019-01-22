import { CurrencyPipe } from "@angular/common";
import { Loan } from "../../models/loan";
import { AverageAmountPipe } from './average-amount.pipe';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
registerLocaleData(localeCs, localeCsExtra);

describe('AverageAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new AverageAmountPipe(new CurrencyPipe('cs'));
    expect(pipe).toBeTruthy();
  });
  it('should return average amount', () => {
    const pipe = new AverageAmountPipe(new CurrencyPipe('cs'));
    let loans: Loan[] = [
      {
        "topped": false,
        "amount": 10,
        "published": true,
        "questionsAllowed": false,
        "multicash": true
      },
      {
        "topped": false,
        "amount": 6,
        "published": true,
        "questionsAllowed": false,
        "multicash": true
      }
    ];
    expect(pipe.transform(loans)).toEqual("8\xA0Kč");
  });
});
