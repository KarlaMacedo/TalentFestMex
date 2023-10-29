/* eslint-disable react/prop-types */
// import { useMemo } from "react";
// import { DateLocalizer, Navigate, ViewProps, Views } from "react-big-calendar";
import { Navigate } from "react-big-calendar";
import Calendar from "react-calendar";
import moment from "moment";
import './calendar.css'

export default function YearView({
  date,
  localizer,
  onView,
  onNavigate,
  nationalFestivities,
  holidays,
  permissions,
  absences
}) {
  console.log(holidays,permissions,absences);

  const currRange = YearView.range(date, { localizer });

  return (
    <div >
      {currRange.map((month, index) => {
        return (
          <div key={index}>
            <Calendar
              activeStartDate={month}
              tileClassName={({ date, view }) => {
                if (
                  view === "month" &&
                  nationalFestivities?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                )
                  return "red";
                return null;
              }}
              // formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
              defaultView="month"
            />
          </div>
        );
      })}
    </div>
  );
}

YearView.range = (date) => {
  const range = [];
  let current = new Date(date.getFullYear(), 0, 1);
  for (let i = 0; i < 12; i++) {
    range.push(current);
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }
  return range;
};

YearView.navigate = (
  date,
  action,
  { localizer }
) => {
  if (action instanceof Date) return action;
  switch (action) {
    case Navigate.NEXT:
      console.log(localizer.add(date));
      return localizer.add(date, 1, "year");
    case Navigate.PREVIOUS:
      console.log(localizer.add(date));
      return localizer.add(date, -1, "year");
    default:
      return date;
  }
};

YearView.title = (date, { localizer }) => {
  return localizer.format(date, "YYYY");
};
