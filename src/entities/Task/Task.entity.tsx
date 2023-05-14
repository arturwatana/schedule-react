import { DateFormat } from "../../utils/DateFormat/DateFormat";
import { TaskProps } from "./interface/ITask";
import { nanoid } from "nanoid";
export class Task {
  id: string;
  name: string;
  urgency: string;
  startDate: string;
  endDate: string;
  completed: boolean;

  private constructor({ name, urgency, endDate }: TaskProps) {
    if (!name) {
      throw new Error("Ops, toda task precisa de um nome.");
    }
    const dateFormat = new DateFormat();
    const endDateFormated = dateFormat.endDateFormat(endDate);

    this.id = nanoid();
    this.name = name;
    this.urgency = urgency ? urgency : "Pouco Urgente";
    this.startDate = dateFormat.formatNewDate(new Date());
    this.endDate = endDateFormated;
    this.completed = false;
  }

  static create(props: TaskProps) {
    const task = new Task(props);
    return task;
  }
}
