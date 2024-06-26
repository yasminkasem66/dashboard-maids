import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'dash-global-loader',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="global_loader" [@fade]>
      <img alt="Loading..." height="150" ngSrc="assets/images/global-loading-spinner.svg" priority="true" width="150" />
    </div>
  `,
  styles: [],
  animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition('* <=> void', [animate('200ms')])])],
})
export class GlobalLoaderComponent {}
