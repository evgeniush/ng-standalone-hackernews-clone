import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="top-heading">
      <a routerLink="/news" class="top-heading__link">
        <img src="assets/images/y18.svg" class="top-heading__logo" alt="News" />
        <span class="top-heading__text">Hacker News</span>
      </a>
    </h1>
  `,
  styles: [
    `
      :host {
        font-size: 10pt;
        color: #828282;
        display: flex;
        align-items: center;
        padding-left: 3px;
        height: 25px;
        background-color: #ff6600;
      }

      .top-heading {
        margin: 0;

        &__link {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        &__logo {
          border: 1px white solid;
          display: block;
          width: 18px;
          height: 18px;
        }

        &__text {
          font-size: 10pt;
          color: black;
          line-height: 12pt;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
