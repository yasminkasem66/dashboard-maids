import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { IWidget } from '../../models/iwidget';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dash-widget',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent {
  @Input() widget!: IWidget;
  @Input() appliedClasses: string = '';
  @Input() iconClasses: string = '';
  @Input() routerLink: string = '';
}
