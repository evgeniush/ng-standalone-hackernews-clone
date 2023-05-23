import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Page Not Found</h2>
    <p>We couldn't find that page! Not even with x-ray vision.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
