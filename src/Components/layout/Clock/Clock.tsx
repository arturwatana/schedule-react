import { useState, useEffect } from "react";
import { DateFormat } from "../../../utils/DateFormat/DateFormat";
import styles from "./Clock.module.css";
function Clock() {
  const [todayDate, setTodayDate] = useState<string>();
  const [fullDate, setFullDate] = useState<string>();
  const [hour, setHour] = useState<string>();

  const months: { [key: string]: string } = {
    Jan: "Janeiro",
    Feb: "Fevereiro",
    Mar: "Marco",
    Apr: "Abril",
    May: "Maio",
    Jun: "Junho",
    Jul: "Julho",
    Aug: "Agosto",
    Sep: "Setembro",
    Oct: "Outubro",
    Nov: "Novembro",
    Dev: "Dezembro",
  };

  const days: { [key: string]: string } = {
    Mon: "Segunda-feira",
    Tue: "Terca-feira",
    Wed: "Quarta-feira",
    Thu: "Quinta-feira",
    Fri: "Sexta-feira",
    Sat: "Sabado",
    Sun: "Domingo",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dateFormat = new DateFormat();
      setTodayDate(dateFormat.formatNewDate(new Date()));
      const dateSting = new Date().toString();
      const full = dateSting.split(" ");
      const dayOfWeek = full[0];
      const month = full[1];
      full[0] = days[dayOfWeek];
      full[1] = months[month];
      const hour = full[4];
      setHour(hour);
      full.splice(4, 2);
      const fullDateFormated = full.join(" ");
      setFullDate(fullDateFormated);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.clock}>
      <p>{todayDate}</p>
      <p>{fullDate}</p>
      <p>{hour}</p>
    </div>
  );
}

export default Clock;
