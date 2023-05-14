import { Task } from "../../../entities/Task/Task.entity";

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  showAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  updateTask(task: Task): Promise<Task | null>;
}
