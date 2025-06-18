import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../domain/task.model';
import { TaskRepository } from '../domain/ports/task.repository';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks = new BehaviorSubject<Task[]>([]);

  findAll(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  findById(id: string): Observable<Task | null> {
    const task = this.tasks.value.find(t => t.id === id);
    return of(task || null);
  }

  save(task: Task): Observable<Task> {
    const currentTasks = this.tasks.value;
    this.tasks.next([...currentTasks, task]);
    return of(task);
  }

  update(id: string, updates: Partial<Task>): Observable<Task> {
    const tasks = this.tasks.value;
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    const updatedTask = { ...tasks[index], ...updates, updatedAt: new Date() };
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    this.tasks.next(newTasks);

    return of(updatedTask);
  }

  delete(id: string): Observable<boolean> {
    const tasks = this.tasks.value.filter(t => t.id !== id);
    this.tasks.next(tasks);
    return of(true);
  }
}
