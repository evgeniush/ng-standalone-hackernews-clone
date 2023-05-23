import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Story } from '@hn-models';
import { ReferencePipe } from '@hn-shared-util';

@Component({
  selector: 'app-story',
  template: `
    <article class="story">
      <h2 class="story__title">
        {{ story.title }}
      </h2>
      <aside *ngIf="story.url" class="story__reference">
        (<a class="story__link" [href]="story.url">{{
          story.url | reference
        }}</a
        >)
      </aside>
      <footer class="story__infos">
        {{ story.score }} point by {{ story.by }}
        {{ story.time | date }}
      </footer>
    </article>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 0.1rem;

        &:before {
          display: inline-block;
          content: '';
          width: 10px;
          height: 10px;
          border: 0px;
          margin: 3px 2px 6px;
          background: url('/assets/images/triangle.svg'),
            linear-gradient(transparent, transparent) no-repeat;
          background-size: 10px;
        }
      }

      .story {
        display: grid;
        grid-template-areas: 'title aside' 'footer footer';
        grid-template-columns: auto 1fr;
        align-items: center;

        &__title {
          display: flex;
          grid-area: title;
          font-size: 10pt;
          font-weight: normal;
          line-height: 19px;
          color: black;
          margin: 0 0 0 0;
          margin-right: 0.5rem;
          padding: 0;
          position: relative;
        }

        &__reference {
          grid-area: aside;
          font-size: 8pt;
          color: #828282;
          text-decoration: none;
        }

        &__link {
          color: #828282;
          text-decoration: none;

          &:hover {
            text-decoration: none;
          }
        }

        &__infos {
          grid-area: footer;
          font-size: 7pt;
          color: #828282;
        }
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, NgIf, ReferencePipe, DatePipe, ReferencePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent {
  @Input() story!: Story;
}
