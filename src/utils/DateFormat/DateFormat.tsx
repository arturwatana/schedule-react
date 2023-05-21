export class DateFormat {
  constructor() {}

  endDateFormat(date: string): string {
    const endDateFormated = date
      .split("-")
      .reverse()
      .toString()
      .replaceAll(",", "/");
    return endDateFormated;
  }

  formatNewDate(date: Date): string {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  compareDates(endDate: string, startDate: string): boolean {
    const invertDate = (date: string) => {
      const initialDate = date.split("/");
      const formatDate = `${initialDate[1]}/${initialDate[0]}/${initialDate[2]}`;
      return formatDate;
    };

    const newDate = {
      startDate: new Date(invertDate(startDate)).getTime(),
      endDate: new Date(invertDate(endDate)).getTime(),
    };

    return newDate.startDate > newDate.endDate;
  }
}
