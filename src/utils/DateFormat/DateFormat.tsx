export function dateFormat(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}
