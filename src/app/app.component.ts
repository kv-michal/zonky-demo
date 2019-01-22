import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Destroy } from "ngx-reactivetoolkit";
import { combineLatest, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Loan } from "./models/loan";
import { Rating } from "./models/rating";
import { ToggleRating } from "./store/app.actions";
import * as fromApp from "./store/app.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  @Destroy() destroy$: Observable<any>;
  loading: boolean = false;
  error: HttpErrorResponse = null;
  ratings: Rating[] = null;
  loans: Loan[] = null;

  constructor(private store: Store<fromApp.State>, private changeDetectorRef: ChangeDetectorRef) {
    combineLatest(
      this.store.select(fromApp.getLoading),
      this.store.select(fromApp.getError),
      this.store.select(fromApp.getRatings),
      this.store.select(fromApp.getLoansByRating),
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([loading, error, ratings, loans]: [boolean, any, Rating[], Loan[]]) => {
      this.loading = loading;
      this.error = error;
      this.ratings = ratings;
      this.loans = loans;
      this.changeDetectorRef.markForCheck();
    })
  }

  ngOnDestroy(): void {
  }

  onToggle(ratingCode: string) {
    this.store.dispatch(new ToggleRating({ratingCode: ratingCode}));
  }
}
