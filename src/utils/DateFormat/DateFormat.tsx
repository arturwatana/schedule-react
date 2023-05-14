export class DateFormat {
  constructor() {}

  endDateFormat(date: string) {
    const endDateFormated = date
      .split("-")
      .reverse()
      .toString()
      .replaceAll(",", "/");
    return endDateFormated;
  }

  formatNewDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }
}
