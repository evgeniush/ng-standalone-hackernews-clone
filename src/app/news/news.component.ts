import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { StoryComponent } from './ui/story.component';
import { SpinnerComponent } from '@hn-shared-ui';
import { injectNewsFeature } from '@hn-shared-data';

@Component({
  selector: 'app-news',
  standalone: true,
  template: `
    <ng-container
      *ngIf="{
        loaded: loaded$ | async,
        news: news$ | async,
        error: newsError$ | async
      } as vm"
    >
      <ol class="news" *ngIf="vm.loaded; else loading">
        <li class="news__item" *ngFor="let story of vm.news">
          <app-story [story]="story"></app-story>
        </li>
      </ol>
      <ng-template #loading>
        <app-spinner></app-spinner>
      </ng-template>

      <p *ngIf="vm.error as error">Error: {{ error }}</p>
    </ng-container>
  `,
  styles: [
    `
      .news {
        &__item {
          margin-bottom: 5px;
        }
      }
    `,
  ],
  imports: [
    CommonModule,
    AsyncPipe,
    NgFor,
    NgIf,
    StoryComponent,
    SpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  readonly vm = injectNewsFeature();
  readonly news$ = this.vm.news$;
  readonly newsError$ = this.vm.error$;
  readonly loaded$ = this.vm.loaded$;
}
