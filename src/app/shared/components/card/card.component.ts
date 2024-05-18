import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IActionTable } from '../../models/iactiont-table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dash-card',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() buttonText?: string;
  @Input() cardLinkText?: string;
  @Input() appliedClasses: string = '';
  @Input() actions?: IActionTable[];
  @Input() data!: any;
}
