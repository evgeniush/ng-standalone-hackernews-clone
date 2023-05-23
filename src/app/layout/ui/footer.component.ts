import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <hr class="footer-separator" />
    <p>Applications are open for YC Summer 2023</p>
    <ul class="footer-nav-placeholder">
      <li>Guidelines</li>
      <li>FAQ</li>
      <li>Lists</li>
      <li>API</li>
      <li>Security</li>
      <li>Legal</li>
      <li>Apply to YC</li>
      <li>Contact</li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
        color: black;
        padding-bottom: 2rem;
      }

      .footer-separator {
        height: 2px;
        background-color: #ff6600;
        border: 0;
      }

      .footer-nav-placeholder {
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 8pt;
        color: #828282;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
