export interface Task {
<<<<<<< HEAD
  id: number;
=======
  id: string;
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
}
<<<<<<< HEAD

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
=======
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
>>>>>>> 23cd44078d53afd8391259a323a488d4121c168c
