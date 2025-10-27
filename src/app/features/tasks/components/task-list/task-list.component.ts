import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task, TaskPriority, TaskStatus } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
      CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonToggleModule,
    MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();

  ts = inject(TaskService);
  search = new FormControl('');

  protected readonly TaskStatus = TaskStatus;
  protected readonly TaskPriority = TaskPriority;

  ngOnInit() { this.search.valueChanges.subscribe(v => this.ts.setFilters({ search: v ?? '' })); }
   onStatusFilter(value: TaskStatus | 'all') {
    this.ts.setFilters({ status: value });
  }
  onPriorityFilter(value: TaskPriority | 'all') {
    this.ts.setFilters({ priority: value });
  }

}