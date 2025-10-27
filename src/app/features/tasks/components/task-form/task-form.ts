import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TasksService } from '../../../../core/services/task';
import { TaskStatus, TaskPriority } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TasksService);
  private cdr = inject(ChangeDetectorRef);

  // 🔹 Exponer las enumeraciones para poder usarlas en el template
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    status: [TaskStatus.PENDING, Validators.required],
    priority: [TaskPriority.LOW, Validators.required]
  });

  isVisible = false;

  toggleDisplay() {
    this.isVisible = !this.isVisible;
    this.cdr.detectChanges();
  }

  submit() {
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
        icon: 'warning',
        timer: 1500
      });
      return;
    }

    const task = {
      ...this.form.value,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const url = 'http://localhost:3000/tasks';
    this.taskService.http.post(url, task).subscribe({
      next: () => {
        Swal.fire({
          title: 'Tarea enviada',
          text: 'La tarea se ha creado correctamente',
          icon: 'success',
          timer: 1500
        });
        this.resetForm();
        this.toggleDisplay();
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar la tarea al servidor',
          icon: 'error'
        });
      }
    });
  }

  resetForm() {
    this.form.reset({
      title: '',
      description: '',
      status: TaskStatus.PENDING,
      priority: TaskPriority.LOW
    });
    this.cdr.detectChanges();
  }

  cancel() {
    this.resetForm();
    this.toggleDisplay();
  }
}
