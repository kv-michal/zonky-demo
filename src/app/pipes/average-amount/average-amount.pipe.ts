import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';
import { Loan } from "../../models/loan";

@Pipe({
  name: 'averageAmount'
})
export class AverageAmountPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {
  }

  transform(loans: Loan[]): string {
    let totalAmount = loans.reduce((sum: number, loan: Loan) => sum + loan.amount, 0);
    return this.currencyPipe.transform(totalAmount / loans.length, 'CZK', 'symbol-narrow', '1.0-0', 'cs')
  }

}
