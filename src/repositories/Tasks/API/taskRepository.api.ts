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
  async findById(id: string, token: string): Promise<Task | null> {
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }

  async updateTask(task: Task, token: string): Promise<Task | null> {
    const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return data;
  }
  async deleteTask(id: string, token: string): Promise<string> {
    await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
    });
    return "Task Deletada";
  }
  async completeTask(id: string, token: string): Promise<Task> {
    const res = await fetch(`http://localhost:8080/tasks/${id}/completed`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
}
