import { Observable } from 'rxjs';
import { Task } from '../task.model';

export abstract class TaskRepository {
  abstract findAll(): Observable<Task[]>;
  abstract findById(id: string): Observable<Task | null>;
  abstract save(task: Task): Observable<Task>;
  abstract update(id: string, updates: Partial<Task>): Observable<Task>;
  abstract delete(id: string): Observable<boolean>;
}
