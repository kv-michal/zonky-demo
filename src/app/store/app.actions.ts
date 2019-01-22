import { HttpErrorResponse } from "@angular/common/http";
import { Action } from '@ngrx/store';
import { Loan } from "../models/loan";

export enum AppActionTypes {
  ToggleRating = '[App] Toggle Rating',
  LoadLoansSuccess = '[App] Load Loans Success',
  LoadLoansError = '[App] Load Loans Error',
}

export class ToggleRating implements Action {
  readonly type = AppActionTypes.ToggleRating;

  constructor(public payload: { ratingCode: string }) {
  }
}

export class LoadLoansSuccess implements Action {
  readonly type = AppActionTypes.LoadLoansSuccess;

  constructor(public payload: { loans: Loan[] }) {
  }
}

export class LoadLoansError implements Action {
  readonly type = AppActionTypes.LoadLoansError;

  constructor(public payload: { error: HttpErrorResponse }) {
  }
}

export type AppActions = ToggleRating | LoadLoansSuccess | LoadLoansError
