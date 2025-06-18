export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface CreateTaskCommand {
  title: string;
  description?: string;
  priority?: TaskPriority;
}

export interface UpdateTaskCommand {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}
