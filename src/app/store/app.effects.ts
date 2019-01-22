import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Loan } from "../models/loan";
import { Rating } from "../models/rating";
import { AppActionTypes, LoadLoansError, LoadLoansSuccess, ToggleRating } from "./app.actions";
import { State } from "./app.reducer";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AppEffects {

  @Effect()
  changeRating$ = this.actions$.pipe(
    ofType(AppActionTypes.ToggleRating),
    withLatestFrom(this.store.pipe(select(fromApp.getActiveRatings))),
    map(([action, ratings]: [ToggleRating, Rating[]]) => {
      return ratings.map((rating: Rating) => `"${rating.code}"`)
    }),
    switchMap((rating_codes: string[]) =>
      this.httpClient.get(`/loans/marketplace?rating__in=[${rating_codes}]&fields=amount`, {
        headers: new HttpHeaders({'X-Size': '1'}),
        observe: 'response'
      }).pipe(
        switchMap((response: HttpResponse<Response>) => {
          let xTotal = response.headers.get('X-Total');
          if (xTotal === "0") {
            return of([]);
          } else {
            return this.httpClient.get(`/loans/marketplace?rating__in=[${rating_codes}]&fields=amount`, {
              headers: new HttpHeaders({'X-Size': response.headers.get('X-Total')})
            })
          }
        }),
        map((loans: Loan[]) => new LoadLoansSuccess({loans: loans})),
        catchError((error) => of(new LoadLoansError({error: error})))
      )
    ),
  );


  constructor(private actions$: Actions, private store: Store<State>, private httpClient: HttpClient) {
  }
}
