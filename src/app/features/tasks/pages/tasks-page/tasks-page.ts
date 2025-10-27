<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboard } from '../../components/task-dashboard/task-dashboard';
import { TasksService } from '../../../../core/services/task';
import { TaskForm } from '../../components/task-form/task-form';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TaskDashboard, TaskForm],
  templateUrl: './tasks-page.html',
})
export class TasksPageComponent {
  tasks: any[] = []; 
  error: string = '';  

  constructor(private tasksService: TasksService) {}

  async loadAllTasks(): Promise<void> {
    try {
      const tasks = await this.tasksService.getAllTasks();
      this.tasks = tasks; 
      console.log(tasks);
    } catch (err) {
      this.error = 'Tasks Not Found';
      console.error('Error al obtener las tareas:', err);
    }

  }
  
  async loadAllTasksByStatusPending(): Promise<void> {
    try {
      const tasksp = await this.tasksService.getPendingTasks();
      this.tasks = tasksp; 
      console.log(tasksp);
    } catch (err) {
      this.error = 'Tasks Not Found or 0';
      console.error('Error al obtener las tareas:', err);
    }
  }
    async loadAllTasksByStatusCompleted(): Promise<void> {
    try {
      const tasksc = await this.tasksService.getCompletedTasks();
      this.tasks = tasksc; 
      console.log(tasksc);
    } catch (err) {
      this.error = 'Tasks Not Found or 0';
      console.error('Error al obtener las tareas:', err);
    }
  }
    async loadAllTasksByStatusInProgress(): Promise<void> {
    try {
      const tasksi = await this.tasksService.getInProgressTasks();
      this.tasks = tasksi; 
      console.log(tasksi);
    } catch (err) {
      this.error = 'Tasks Not Found or 0';
      console.error('Error al obtener las tareas:', err);
    }
  }

  async getTaskById(taskId: number): Promise<void> {
    try {
      const task = await this.tasksService.getTaskById(taskId);
      console.log('Task found:', task);
    } catch (err) {
      this.error = 'Task Not Found';
      console.error('Error fetching the task:', err);
    }
  }
  // Llamar a esta función en ngOnInit o algún evento para cargar las tareas
  ngOnInit(): void {
    this.loadAllTasks();
    this.loadAllTasksByStatusPending();
    this.loadAllTasksByStatusCompleted();
    this.loadAllTasksByStatusInProgress();
    this.getTaskById(1);
    console.log("tareas cargadas")
  }
}

=======
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../../../core/services/task.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskDashboardComponent } from '../../components/task-dashboard/task-dashboard.component';
import { Task } from '../../../../core/models/task.model';
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatDialogModule, MatProgressBarModule, MatCardModule,
    TaskDashboardComponent
  ],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  ts = inject(TaskService);
  dialog = inject(MatDialog);
  ngOnInit() { this.ts.loadAll(); }
  openCreate() {
    const ref = this.dialog.open(TaskFormComponent, { data: { mode: 'create' } });
    ref.afterClosed().subscribe(result => { if (result) this.ts.create(result); });
  }
  openEdit(task: Task) {
    const ref = this.dialog.open(TaskFormComponent, { data: { mode: 'edit', task } });
    ref.afterClosed().subscribe(result => { if (result) this.ts.update(task.id, result); });
  }
}
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
