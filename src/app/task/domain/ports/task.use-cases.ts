import { Observable } from 'rxjs';
import { Task, CreateTaskCommand, UpdateTaskCommand } from '../task.model';

export abstract class TaskUseCases {
  abstract getTasks(): Observable<Task[]>;
  abstract getTaskById(id: string): Observable<Task | null>;
  abstract createTask(command: CreateTaskCommand): Observable<Task>;
  abstract updateTask(id: string, command: UpdateTaskCommand): Observable<Task>;
  abstract deleteTask(id: string): Observable<boolean>;
}
