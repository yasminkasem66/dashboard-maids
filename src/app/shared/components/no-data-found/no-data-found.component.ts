import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dash-no-data-found',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss'],
})
export class NoDataFoundComponent {}
