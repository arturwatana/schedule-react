import { Task } from "../../../entities/Task/Task.entity";
import { ITaskRepository } from "../interface/ITaskRepository";

export class TaskRepositoryFake implements ITaskRepository {
  async save(task: Task): Promise<Task> {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return task;
  }
  async showAll(): Promise<Task[]> {
    const tasksInDB = fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return tasksInDB;
  }

  async findById(id: string): Promise<Task | null> {
    const tasksInDB = fetch(`http://localhost:5000/tasks/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return tasksInDB;
  }
  async updateTask(task: Task): Promise<Task> {
    const taskInDB = fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return taskInDB;
  }
}
