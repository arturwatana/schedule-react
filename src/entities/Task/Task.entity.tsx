import { dateFormat } from "../../utils/DateFormat/DateFormat";
import { TaskProps } from "./interface/ITask";
import { nanoid } from "nanoid";
export class Task {
  id: string;
  name: string;
  urgency: string;
  startDate: string;
  endDate: string;

  private constructor({ name, urgency, endDate }: TaskProps) {
    if (!name) {
      throw new Error("Ops, toda task precisa de um nome.");
    }
    if (!endDate) {
      endDate = dateFormat(new Date());
    }
    const endDateFormated = endDate
      .split("-")
      .reverse()
      .toString()
      .replaceAll(",", "/");
    this.id = nanoid();
    this.name = name;
    this.urgency = urgency ? urgency : "Pouco Urgente";
    this.startDate = dateFormat(new Date());
    this.endDate = endDateFormated;
  }

  static create(props: TaskProps) {
    const task = new Task(props);
    return task;
  }
}
