export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}
export enum TaskStatus {
  pending = 'pending',
  in_progress = 'in_progress',
  completed = 'completed',
}
export enum TaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}