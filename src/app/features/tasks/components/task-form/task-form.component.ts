import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Task, TaskPriority, TaskStatus } from '../../../../core/models/task.model';

type DialogData = { mode: 'create' | 'edit'; task?: Task };

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<TaskFormComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['',[Validators.required]],
    status: ['pending' as TaskStatus, Validators.required],
    priority: ['medium' as TaskPriority, Validators.required]
  });

  ngOnInit() {
    if (this.data.mode === 'edit' && this.data.task) {
      const { title, description, status, priority } = this.data.task;
      this.form.patchValue({ title, description, status, priority});
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }
}