import {
  createActionGroup,
  createFeature,
  createReducer,
  createSelector,
  emptyProps,
  on,
  props,
  provideState,
  Store,
} from '@ngrx/store';
import { Actions, createEffect, ofType, provideEffects } from '@ngrx/effects';
import { inject, makeEnvironmentProviders } from '@angular/core';
import { catchError, exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Story } from '@hn-models';
import { ApiService } from './api.service';

const LIMIT_ITEMS = 10;

export interface NewsState {
  collection: Story[];
  currentStoryId: number | null;
  loaded: boolean;
  error: string | null;
}

export const initialState: NewsState = {
  collection: [],
  currentStoryId: null,
  loaded: false,
  error: null,
};

export const NewsActions = createActionGroup({
  source: 'News',
  events: {
    enter: emptyProps(),
    'Story Selected': props<{ id: number }>(),
    'News Loaded Success': props<{ stories: Story[] }>(),
    'News Loaded Failure': props<{ error: string }>(),
  },
});

export const newsFeature = createFeature({
  name: 'news',
  reducer: createReducer(
    initialState,
    on(NewsActions.enter, (state) => {
      return {
        ...state,
        collection: [],
      };
    }),
    on(NewsActions.storySelected, (state, { id }) => {
      return {
        ...state,
        currentStoryId: id,
      };
    }),
    on(NewsActions.newsLoadedSuccess, (state, { stories }) => {
      return {
        ...state,
        collection: stories,
        loaded: true,
      };
    }),
    on(NewsActions.newsLoadedFailure, (state, { error }) => {
      return {
        ...initialState,
        loaded: true,
        error,
      };
    })
  ),
  extraSelectors: ({ selectCollection, selectCurrentStoryId }) => ({
    selectCurrentStory: createSelector(
      selectCollection,
      selectCurrentStoryId,
      (stories, id) => stories.find((story) => story.id === id)
    ),
  }),
});

export const {
  selectCollection: selectAllStories,
  selectLoaded,
  selectError,
} = newsFeature;

export const loadNews$ = createEffect(
  (actions$ = inject(Actions)) => {
    const http = inject(HttpClient);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(NewsActions.enter),
      exhaustMap(() => apiService.getNewStories()),
      switchMap((ids) =>
        forkJoin([
          ...ids.slice(0, LIMIT_ITEMS).map((id) => apiService.getItem(id)),
        ]).pipe(
          map((stories) => NewsActions.newsLoadedSuccess({ stories })),
          catchError((err) =>
            of(
              NewsActions.newsLoadedFailure({
                error: err as unknown as string,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);

export function provideNewsFeature() {
  return makeEnvironmentProviders([
    provideState(newsFeature),
    provideEffects({ loadNews$ }),
  ]);
}

export function injectNewsFeature() {
  const store = inject(Store);

  return {
    enter: () => store.dispatch(NewsActions.enter()),
    news$: store.select(selectAllStories),
    loaded$: store.select(selectLoaded),
    error$: store.select(selectError),
  };
}
