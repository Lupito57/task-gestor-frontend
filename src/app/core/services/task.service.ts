import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';
type Filters = {
  search: string;
  status: 'all' | TaskStatus;
  priority: 'all' | TaskPriority;
};
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = 'http://localhost:3000';
  private tasksSignal = signal<Task[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private filtersSignal = signal<Filters>({ search: '', status: 'all', priority: 'all' });
  tasks = this.tasksSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  error = this.errorSignal.asReadonly();
  filters = this.filtersSignal.asReadonly();
  filteredTasks = computed(() => {
    const { search, status, priority } = this.filtersSignal();
    return this.tasksSignal().filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase().trim());
      const matchesStatus = status === 'all' ? true : t.status === status;
      const matchesPriority = priority === 'all' ? true : t.priority === priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  });
  countPending = computed(() => this.tasksSignal().filter(t => t.status === 'pending').length);
  countInProgress = computed(() => this.tasksSignal().filter(t => t.status === 'in_progress').length);
  countCompleted = computed(() => this.tasksSignal().filter(t => t.status === 'completed').length);
  constructor(private http: HttpClient) {}
  setFilters(patch: Partial<Filters>) {
    this.filtersSignal.update(f => ({ ...f, ...patch }));
  }
  loadAll() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.http.get<Task[]>(`${this.baseUrl}/tasks`)
      .pipe(
        tap(tasks => this.tasksSignal.set(tasks)),
        finalize(() => this.loadingSignal.set(false))
      )
      .subscribe({ error: err => this.errorSignal.set(err?.message ?? 'Error loading tasks') });
  }
  create(payload: Pick<Task, 'title' | 'description' | 'status' | 'priority'>) {
    this.loadingSignal.set(true);
    this.http.post<Task>(`${this.baseUrl}/tasks`, payload)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: task => this.tasksSignal.update(list => [task, ...list]),
        error: err => this.errorSignal.set(err?.message ?? 'Error creating task')
      });
  }
  update(id: string, patch: Partial<Pick<Task,'title'|'description'|'status'|'priority'>>) {
    this.loadingSignal.set(true);
    this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`, patch)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: updated => this.tasksSignal.update(list => list.map(t => t.id === id ? updated : t)),
        error: err => this.errorSignal.set(err?.message ?? 'Error updating task')
      });
  }
  replace(id: string, data: Pick<Task,'title'|'description'|'status'|'priority'>) {
    this.loadingSignal.set(true);
    this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, data)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: updated => this.tasksSignal.update(list => list.map(t => t.id === id ? updated : t)),
        error: err => this.errorSignal.set(err?.message ?? 'Error replacing task')
      });
  }
  remove(id: string) {
    this.loadingSignal.set(true);
    this.http.delete<{message:string}>(`${this.baseUrl}/tasks/${id}`)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: () => this.tasksSignal.update(list => list.filter(t => t.id !== id)),
        error: err => this.errorSignal.set(err?.message ?? 'Error deleting task')
      });
  }
  toggleStatus(id: string) {
    const t = this.tasksSignal().find(x => x.id === id);
    if (!t) return;
    const next: TaskStatus =
      t.status === TaskStatus.pending
        ? TaskStatus.in_progress
        : t.status === TaskStatus.in_progress
          ? TaskStatus.completed
          : TaskStatus.pending;
    this.update(id, { status: next });
  }
}

