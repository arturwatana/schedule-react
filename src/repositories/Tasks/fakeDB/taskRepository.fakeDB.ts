import { Task } from "../../../entities/Task/Task.entity";
import { ITaskRepository } from "../interface/ITaskRepository";

export class TaskRepositoryFake implements ITaskRepository {
  async showAllByUserEmail(userEmail: string, token: string): Promise<Task[]> {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
  deleteTask(id: string, token: string): Promise<string> {
    console.log(id, token);

    throw new Error("Method not implemented.");
  }
  completeTask(id: string, token: string): Promise<Task> {
    console.log(id, token);

    throw new Error("Method not implemented.");
  }
  async save(task: Task): Promise<Task> {
    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          throw new Error(err);
        });
      return task;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async showAll(): Promise<Task[]> {
    try {
      const tasksInDB = await fetch("http://localhost:5000/tasks", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          throw new Error(err);
        });

      return tasksInDB;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async findById(id: string): Promise<Task | null> {
    try {
      const tasksInDB = fetch(`http://localhost:5000/tasks/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data)

        .catch((err) => {
          throw new Error(err.message);
        });

      return tasksInDB;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateTask(task: Task): Promise<Task> {
    try {
      const taskInDB = fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          throw new Error(err.message);
        });
      return taskInDB;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
