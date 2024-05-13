import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dash-title-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-box.component.html',
  styleUrl: './title-box.component.scss',
})
export class TitleBoxComponent {
  @Input() appliedClasses: string = '';
  @Input() headerClasses: string = '';
  @Input() Header: string = '';
}
