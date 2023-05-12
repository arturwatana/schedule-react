import { Task } from "../../entities/Task/Task.entity";
import { ITaskRepository } from "../../repositories/Tasks/interface/ITaskRepository";

export class AddTaskToDB {
  constructor(private taskRepository: ITaskRepository) {}
  async execute(task: Task) {
    this.taskRepository.save(task);
    return task;
  }
}
