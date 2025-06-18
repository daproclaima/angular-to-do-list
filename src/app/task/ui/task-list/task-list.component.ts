import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TaskUseCases } from '../../domain/ports/task.use-cases';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  template: `
    <div class="task-container">
      <h1>My Tasks</h1>

      <p-button
        label="Add Task"
        icon="pi pi-plus"
        (onClick)="addSampleTask()"
        class="mb-3"
      ></p-button>

      <div class="task-grid">
        <p-card *ngFor="let task of tasks$ | async" [header]="task.title">
          <p>{{ task.description || 'No description' }}</p>
          <p class="text-sm text-color-secondary">
            Status: {{ task.status }} | Priority: {{ task.priority }}
          </p>
          <ng-template #footer>
            <div class="flex gap-4 mt-1">
<!--              <p-button label="Modify" severity="secondary" class="w-full" [outlined]="true" styleClass="w-full" />-->
              <p-button label="Delete" class="w-full" styleClass="w-full" (onClick)="deleteTask(task.id)" />
            </div>
          </ng-template>
        </p-card>

        <p *ngIf="(tasks$ | async)?.length === 0" class="empty-state">
          No tasks yet. Click "Add Task" to create one!
        </p>
      </div>
    </div>
  `,
  styles: [`
    .task-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      color: var(--primary-color);
      margin-bottom: 2rem;
    }

    .task-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--text-color-secondary);
    }

    .mb-3 {
      margin-bottom: 1rem;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .text-color-secondary {
      color: var(--text-color-secondary);
    }
  `]
})
export class TaskListComponent {
  private taskUseCases = inject(TaskUseCases);
  tasks$ = this.taskUseCases.getTasks();

  addSampleTask() {
    this.taskUseCases.createTask({
      title: `Task ${Date.now()}`,
      description: 'This is a sample task'
    }).subscribe();
  }

  deleteTask(taskId: string) {
    this.taskUseCases.deleteTask(taskId).subscribe({
      next: (success) => {
        console.log('Task deleted:', success);
        // The UI will auto-update because tasks$ is an Observable
      },
      error: (error) => {
        console.error('Delete failed:', error);
      }
    });
  }
}
