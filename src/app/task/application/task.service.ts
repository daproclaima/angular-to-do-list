import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, CreateTaskCommand, UpdateTaskCommand, TaskStatus, TaskPriority } from '../domain/task.model';
import { TaskRepository } from '../domain/ports/task.repository';
import { TaskUseCases } from '../domain/ports/task.use-cases';

@Injectable()
export class TaskService implements TaskUseCases {
  private repository = inject(TaskRepository);

  getTasks(): Observable<Task[]> {
    return this.repository.findAll();
  }

  getTaskById(id: string): Observable<Task | null> {
    return this.repository.findById(id);
  }

  createTask(command: CreateTaskCommand): Observable<Task> {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: command.title,
      description: command.description,
      status: TaskStatus.PENDING,
      priority: command.priority || TaskPriority.MEDIUM,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return this.repository.save(newTask);
  }

  updateTask(id: string, command: UpdateTaskCommand): Observable<Task> {
    return this.repository.update(id, command);
  }

  deleteTask(id: string): Observable<boolean> {
    debugger
    return this.repository.delete(id);
  }
}
