import { Routes } from '@angular/router';
import { TasksPageComponent } from './features/tasks/pages/tasks-page/tasks-page';

export const routes: Routes = [
<<<<<<< HEAD
  { path: 'tasks', component: TasksPageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'tasks' }
];
=======
  { path: '', component: TasksPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
