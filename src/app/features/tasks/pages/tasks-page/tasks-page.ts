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
