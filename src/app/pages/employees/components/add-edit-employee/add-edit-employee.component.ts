import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { IEmployee } from '../../modal/iemployee';
import { ActionType } from '../../enums/action-type';

@Component({
  selector: 'dash-add-edit-employee',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss',
})
export class AddEditEmployeeComponent {
  private fb = inject(FormBuilder);
  @Input({ required: true }) openModal: boolean = false;
  @Input() employee?: IEmployee;
  @Input() actionTypeValue: ActionType = ActionType.add;
  @Output() actionClicked: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();
  @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  actionType: typeof ActionType = ActionType;
  protected readonly Math = Math;
  employeeForm!: FormGroup;
  actionName!: string;

  ngOnInit(): void {
    this.createForm();
    this.actionName = this.actionTypeValue == ActionType.add ? 'Save' : 'Update';
    this.actionTypeValue == ActionType.add ? null : this.dispatchValue();
  }

  createForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      salary: [null, [Validators.required]],
      deductions: [null, [Validators.required]],
    });
  }

  dispatchValue() {
    this.employeeForm.patchValue({ ...this.employee });
  }

  modalSubmitted() {
    this.actionClicked.emit(this.employeeForm.value);
  }
}
