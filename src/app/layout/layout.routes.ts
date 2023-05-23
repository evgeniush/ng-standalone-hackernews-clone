import { Routes } from '@angular/router';
import { newsDataResolver } from '@hn-shared-data';
import { PageNotFoundComponent } from '../page-not-found';

export const routes: Routes = [
  {
    path: 'news',
    loadComponent: async () =>
      (await import('../news/news.component')).NewsComponent,
    resolve: { news: newsDataResolver },
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
