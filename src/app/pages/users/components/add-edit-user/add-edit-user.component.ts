import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ActionType } from '../../enums/action-type';
import { IUser } from '../../modals/iuser';

@Component({
  selector: 'dash-add-edit-user',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
})
export class AddEditUserComponent {
  private fb = inject(FormBuilder);
  @Input({ required: true }) openModal: boolean = false;
  @Input() user?: IUser;
  @Input() actionTypeValue: ActionType = ActionType.add;
  @Output() actionClicked: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  actionType: typeof ActionType = ActionType;
  protected readonly Math = Math;
  userForm!: FormGroup;
  actionName!: string;

  ngOnInit(): void {
    this.createForm();
    this.actionName = this.actionTypeValue == ActionType.add ? 'Save' : 'Update';
    this.actionTypeValue == ActionType.add ? null : this.dispatchValue();
  }

  createForm() {
    this.userForm = this.fb.group({
      id: [Math.random()],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      avatar: ['https://picsum.photos/200'],
    });
  }

  dispatchValue() {
    this.userForm.patchValue({ ...this.user });
  }

  modalSubmitted() {
    this.actionClicked.emit(this.userForm.value);
  }
}
