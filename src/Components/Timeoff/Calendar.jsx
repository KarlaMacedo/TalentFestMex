/* eslint-disable react/prop-types */
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  // View,
} from "react-big-calendar";
import moment from "moment";
import YearView from "./YearView";
import { useEffect, useState } from "react";

import 'moment/locale/es';
import { getHolidaysInfo } from "../../Services/authService";
moment.locale("es");

const localizer = momentLocalizer(moment);
// const nationalFestivities = [
//   // feriados que NO se
//   //feriado nacional que sí se trabaja
//   //resalte las vacaciones
//   {
//     start: moment("2023-09-15T10:00:00").toDate(),
//     end: moment("2023-09-15T12:00:00").toDate(),
//     // title: "Independencia de México",
//   },
//   {
//     start: moment("2023-03-21T10:00:00").toDate(),
//     end: moment("2023-03-21T11:00:00").toDate(),
//     // title: "Natalicio Benito Juárez",
//   },
//   {
//     start: moment("2023-06-10T10:00:00").toDate(),
//     end: moment("2023-06-10T11:00:00").toDate(),
//     // title: "Plastic Surgery",
//   },
// ];


export default function Calendar({theme}) {
  // console.log(theme);
  const [view, setView] = useState(Views.MONTH); // Set the default view to YEAR
  const [date, setDate] = useState(new Date());
  const views = {
    month: true,
    year: YearView,
  };
  
  const handleViewChange = (newView) => {
    if (views[newView]) {
      setView(newView);
    }
  };

  const userId = localStorage.getItem('user-uid');
  const getHolidayObj = async () => {
    const holidayObj = await getHolidaysInfo(userId)
    console.log(holidayObj)
    return holidayObj
  }

  useEffect(() => {
    getHolidayObj()
  }, [])
  
  return (
    <BigCalendar
      localizer={localizer}
      defaultView={Views.MONTH}
      view={view}
      date={date}
      onView={handleViewChange}
      onNavigate={(newDate) => setDate(newDate)}
      views={views}
      messages={{
        next: ">>",
        previous: "<<",
        today: "Hoy",
        month: "Mes",
        year: "Año",
        week: "Semana"}}
      theme = {theme}
    />
  );
}
