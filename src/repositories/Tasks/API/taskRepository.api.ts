import { Task } from "../../../entities/Task/Task.entity";
import { ITaskRepository } from "../interface/ITaskRepository";

export class TaskAPIRepository implements ITaskRepository {
  async save(task: Task, token: string): Promise<Task> {
    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authentication: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async showAllByUserEmail(userEmail: string, token: string): Promise<Task[]> {
    try {
      if (!userEmail || !token) {
        throw new Error("Ops, voce precisa fazer o login");
      }
      const res = await fetch(`http://localhost:8080/tasks/${userEmail}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authentication: `Bearer ${token}`,
        },
      });
      const tasks = await res.json();
      if (tasks.message) {
        throw new Error(tasks.message);
      }
      return tasks;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  findById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  updateTask(task: Task): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
}
