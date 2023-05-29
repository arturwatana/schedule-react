import { Task } from "../../../entities/Task/Task.entity";

export interface ITaskRepository {
  save(task: Task, token: string): Promise<Task>;
  showAllByUserEmail(userEmail: string, token: string): Promise<Task[]>;
  findById(id: string, token: string): Promise<Task | null>;
  updateTask(task: Task, token: string): Promise<Task | null>;
  deleteTask(id: string, token: string): Promise<string>;
  completeTask(id: string, token: string): Promise<Task>;
}
