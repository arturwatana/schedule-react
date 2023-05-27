import { DateFormat } from "../../utils/DateFormat/DateFormat";
import { TaskProps } from "./interface/ITask";
import { nanoid } from "nanoid";
export class Task {
  id: string;
  name: string;
  urgency: string;
  userEmail?: string;
  startDate: string;
  endDate: string;
  description: string;
  completed: string;

  private constructor({
    name,
    urgency,
    endDate,
    description,
    userEmail,
  }: TaskProps) {
    if (!name) {
      throw new Error("Ops, toda task precisa de um nome.");
    }
    const dateFormat = new DateFormat();
    const endDateFormated = () => {
      if (endDate) {
        return dateFormat.endDateFormat(endDate);
      }

      return dateFormat.formatNewDate(new Date());
    };

    this.id = "";
    this.name = name;
    this.urgency = urgency ? urgency : "Nao Urgente";
    this.startDate = dateFormat.formatNewDate(new Date());
    this.endDate = endDateFormated();
    this.completed = "Em Andamento";
    this.description = description;
    this.userEmail = userEmail;
  }

  static create(props: TaskProps) {
    const task = new Task(props);
    return task;
  }
}
