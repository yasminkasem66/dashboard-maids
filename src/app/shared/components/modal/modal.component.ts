import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dash-modal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title?: string;
  @Input() delete?: boolean;
  @Input() closeBtnTitle?: string;
  @Input() submitBtnTitle?: string;
  @Input() wrapperClasses: string = 'w-100';
  @Input() closeBtnStyle: string = '';
  @Input() isBtnLarge?: boolean;
  @Output() modalClosed = new EventEmitter<boolean>();
  @Output() modalSubmitted = new EventEmitter<boolean>();

  hideModal() {
    this.modalClosed.next(false);
  }
  submit() {
    this.modalSubmitted.next(true);
  }
}
