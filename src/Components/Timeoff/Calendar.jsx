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
  const [view, setView] = useState(Views.MONTH); // Set the default view to YEAR
  const [date, setDate] = useState(new Date());
  // let pendingHolidays, rejectedHolidays, acceptedHolidays, absences, special_days
  const [pendingHolidays, setPendingHolidays] = useState()
  const [rejectedHolidays, setRejectedHolidays] = useState()
  const [acceptedHolidays, setAcceptedHolidays] = useState()
  const [absences, setAbsences] = useState()
  const [specialDays, setSpecialDays] = useState()

  const views = {
    month: true,
    year: YearView,
  };

  const dateObject = new Date(date);
  const year = dateObject.getFullYear();

  const nationalFestivities = [
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
    let holidayData = localStorage.getItem('holidays')
    holidayData = JSON.parse(holidayData)
    // console.log(holidayData);
    return holidayData
  }

  useEffect(() => {
    async function fetchData() {
      const response = await getHolidayObj()
      setPendingHolidays(dateFormatter(response.holidays.pending))
      setRejectedHolidays(dateFormatter(response.holidays.rejected))
      setAcceptedHolidays(dateFormatter(response.holidays.success))
      setAbsences(dateFormatter(response.absences.dates))
      setSpecialDays(dateFormatter(response.permissions.special_days))
    }
    fetchData();
  }, []);
  // console.log(specialDays);

  const dateFormatter = (dateArray) => {
    // console.log(dateArray);
    let newArray = []
    for (let date of dateArray) {
      newArray.push(date.map((date) => date.replace(/\//g, '-')))
    }
    // console.log(newArray);
    let dateObjArr = []
    dateObjArr.push(newArray.map((el) => {
      return {
        start: moment(el[0]).toDate(),
        end: moment(el[1]).toDate(),
      }
    })
    )
    // console.log('date object array ',dateObjArr.flat());
    return dateObjArr.flat()
  }

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
      nationalFestivities={nationalFestivities}
      pendingHolidays={pendingHolidays}
      acceptedHolidays={acceptedHolidays}
      rejectedHolidays={rejectedHolidays}
      absences={absences}
    />
  );
}
