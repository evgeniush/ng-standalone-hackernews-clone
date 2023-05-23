import { ResolveFn } from '@angular/router';
import { injectNewsFeature } from './news.store';
import { take, tap } from 'rxjs';

export const newsDataResolver: ResolveFn<boolean> = () => {
  const newsFeature = injectNewsFeature();
  const loaded$ = newsFeature.loaded$;

  return loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        newsFeature.enter();
      }
    }),
    take(1)
  );
};
