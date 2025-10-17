import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../../core/services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../../../core/models/task.model';
@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [MatProgressSpinnerModule, TaskListComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent {
  ts = inject(TaskService);
  /** Reenvía el evento de edición hacia la página */
  @Output() edit = new EventEmitter<Task>();
}