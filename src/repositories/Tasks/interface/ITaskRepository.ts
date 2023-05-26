import { Task } from "../../../entities/Task/Task.entity";

export interface ITaskRepository {
  save(task: Task, token: string): Promise<Task>;
  showAllByUserEmail(userEmail: string, token: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  updateTask(task: Task): Promise<Task | null>;
}
