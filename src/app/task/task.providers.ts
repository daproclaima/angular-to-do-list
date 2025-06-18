import { Provider } from '@angular/core';
import { TaskRepository } from './domain/ports/task.repository';
import { TaskUseCases } from './domain/ports/task.use-cases';
import { InMemoryTaskRepository } from './infrastructure/in-memory-task.repository';
import { TaskService } from './application/task.service';

export const taskProviders: Provider[] = [
  {
    provide: TaskRepository,
    useClass: InMemoryTaskRepository
  },
  {
    provide: TaskUseCases,
    useClass: TaskService
  }
];
