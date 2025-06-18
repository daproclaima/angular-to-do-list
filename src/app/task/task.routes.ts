import { Routes } from '@angular/router';
import { TaskListComponent } from './ui/task-list/task-list.component';
import { taskProviders } from './task.providers';

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    providers: taskProviders
  }
];
