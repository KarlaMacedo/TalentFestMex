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
import { getHolidaysInfo } from "../../Services/authService";
import 'moment/locale/es';

moment.locale("es");
const localizer = momentLocalizer(moment);

export default function Calendar({ theme }) {

  // console.log(theme);
  const [view, setView] = useState(Views.MONTH); // Set the default view to YEAR
  const [date, setDate] = useState(new Date());
  const views = {
    month: true,
    year: YearView,
  };

  const dateObject = new Date(date);
  const year = dateObject.getFullYear();

  const nationalFestivities = [
  // feriados que NO se trabaja
  //resalte las vacaciones
  {
    start: moment(`${year}-01-01`).toDate(),
    end: moment(`${year}-01-01`).toDate(),
  },
  {
    start: moment(`${year}-02-06`).toDate(),
    end: moment(`${year}-02-06`).toDate(),
  },
  {
    start: moment(`${year}-03-21`).toDate(),
    end: moment(`${year}-03-21`).toDate(),
  },
  {
    start: moment(`${year}-04-06`).toDate(),
    end: moment(`${year}-04-06`).toDate(),
  },
  {
    start: moment(`${year}-04-07`).toDate(),
    end: moment(`${year}-04-07`).toDate(),
  },
  {
    start: moment(`${year}-05-01`).toDate(),
    end: moment(`${year}-05-01`).toDate(),
  },
  {
    start: moment(` ${year}-09-16`).toDate(),
    end: moment(` ${year}-09-16`).toDate(),
  },
  {
    start: moment(` ${year}-11-02`).toDate(),
    end: moment(` ${year}-11-02`).toDate(),
  },
  {
    start: moment(` ${year}-11-20`).toDate(),
    end: moment(` ${year}-11-20`).toDate(),
  },
  {
    start: moment(` ${year}-12-12`).toDate(),
    end: moment(` ${year}-12-12`).toDate(),
  },
  {
    start: moment(` ${year}-12-25`).toDate(),
    end: moment(` ${year}-12-25`).toDate(),
  },
];
  const handleViewChange = (newView) => {
    if (views[newView]) {
      setView(newView);
    }
  };


  const userId = localStorage.getItem('user-uid');
  const getHolidayObj = async () => {
    const holidayObj = await getHolidaysInfo(userId)
    localStorage.setItem('holidays', JSON.stringify(holidayObj))
    return holidayObj
  }

  useEffect(() => {
    getHolidayObj()
  }, [])

  let holidayObj = localStorage.getItem('holidays')
  holidayObj = JSON.parse(holidayObj)
  const holidays = holidayObj.holidays
  const permissions = holidayObj.permissions
  const absences = holidayObj.absences

  console.log(holidays, permissions, absences);

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
        week: "Semana"
      }}
      theme={theme}
      nationalFestivities = {nationalFestivities}
    />
  );
}
