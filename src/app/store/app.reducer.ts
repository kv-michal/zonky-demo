import { HttpErrorResponse } from "@angular/common/http";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppActions, AppActionTypes } from './app.actions';
import immutable from 'object-path-immutable';

export interface State {
  loading: boolean;
  error: HttpErrorResponse;
  ratings: Array<Rating>;
  loans: Array<Loan>;
}

export const initialState: State = {
  loading: false,
  error: null,
  ratings: [
    {name: "A**", code: "AAAAA", isActive: false},
    {name: "A*", code: "AAAA", isActive: false},
    {name: "A++", code: "AAA", isActive: false},
    {name: "A+", code: "AA", isActive: false},
    {name: "A", code: "A", isActive: false},
    {name: "B", code: "B", isActive: false},
    {name: "C", code: "C", isActive: false},
    {name: "D", code: "D", isActive: false},
  ],
  loans: null,
};

export function reducer(state: State = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.ToggleRating: {
      let toggleIndex = state.ratings.findIndex((rating) => rating.code === action.payload.ratingCode);
      return immutable(state)
        .set(`ratings.${toggleIndex}.isActive`, !state.ratings[toggleIndex].isActive)
        .set('loading', true)
        .set('error', null)
        .value();
    }
    case AppActionTypes.LoadLoansSuccess: {
      return immutable(state)
        .set('loans', action.payload.loans)
        .set('loading', false)
        .value();
    }
    case AppActionTypes.LoadLoansError: {
      return immutable(state)
        .set('error', action.payload.error)
        .set('loans', null)
        .set('loading', false)
        .value();
    }
    default: {
      return state
    }
  }
}

export const getAppState = createFeatureSelector('app');
export const getLoading = createSelector(getAppState, (state: State) => state.loading);
export const getError = createSelector(getAppState, (state: State) => state.error);
export const getRatings = createSelector(getAppState, (state: State) => state.ratings);
export const getActiveRatings = createSelector(getRatings, (ratings: Rating[]) => ratings.filter((rating: Rating) => rating.isActive));
export const getLoansByRating = createSelector(getAppState, (state: State) => state.loans);
