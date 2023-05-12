import { TaskProps } from "../../../entities/Task/interface/ITask";
import { Task } from "../../../entities/Task/Task.entity";
import { ITaskRepository } from "../interface/ITaskRepository";

export class TaskRepository implements ITaskRepository {
  private static readonly TASKS_STORAGE_KEY = "tasks";
  private tasks: Task[];

  private static instance: TaskRepository;

  private constructor() {
    const tasksInStorage = localStorage.getItem(
      TaskRepository.TASKS_STORAGE_KEY
    );
    this.tasks = tasksInStorage ? JSON.parse(tasksInStorage) : [];
  }

  static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }

  async save(task: Task): Promise<Task> {
    this.tasks.push(task);
    localStorage.setItem(
      TaskRepository.TASKS_STORAGE_KEY,
      JSON.stringify(this.tasks)
    );
    return task;
  }

  async showAll(): Promise<Task[]> {
    return this.tasks;
  }
}