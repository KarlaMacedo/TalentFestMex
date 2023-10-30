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
  pendingHolidays,
  acceptedHolidays, rejectedHolidays, absences, specialDays
}) {
  console.log(rejectedHolidays);

  const currRange = YearView.range(date, { localizer });

  let startDateRange = false

  return (
    <div >
      {currRange.map((month, index) => {
        return (
          <div key={index}>
            <Calendar
              activeStartDate={month}
              // tileClassName={({ date, view }) => {
              //   // NATIONAL HOLIDAYS
              //   if (
              //     view === "month" &&
              //     nationalFestivities?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     return "red-holiday";
              //   }

              //   // PENDING HOLIDAYS
              //   if (
              //     view === "month" &&
              //     pendingHolidays?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     startDateRange = true
              //     return "orange-holiday";
              //   }

              //   if (startDateRange) {
              //     if (view === "month" &&
              //       pendingHolidays?.find((event) =>
              //         moment(event.end).isSame(moment(date), "day")
              //       )) {
              //       startDateRange = false
              //       return "orange-holiday";
              //     }
              //     return "orange-holiday";
              //   }

              //   //ACCEPTED HOLIDAYS
              //   if (
              //     view === "month" &&
              //     acceptedHolidays?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     startDateRange = true
              //     return "green-holiday";
              //   }

              //   if (startDateRange) {
              //     if (view === "month" &&
              //       acceptedHolidays?.find((event) =>
              //         moment(event.end).isSame(moment(date), "day")
              //       )) {
              //       startDateRange = false
              //       return "green-holiday";
              //     }
              //     return "green-holiday";
              //   }

              //   // REJECTED HOLIDAY
              //   if (
              //     view === "month" &&
              //     rejectedHolidays?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     startDateRange = true
              //     return "pink-holiday";
              //   }

              //   if (startDateRange ) {
              //     if (view === "month" &&
              //     rejectedHolidays?.find((event) =>
              //       moment(event.end).isSame(moment(date), "day")
              //     )) {
              //       startDateRange = false
              //     return "pink-holiday";
              //     }
              //     return "pink-holiday";
              //   }

              //   //ABSENCES
              //   if (
              //     view === "month" &&
              //     absences?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     startDateRange = true
              //     return "blue-absence";
              //   }

              //   if (startDateRange ) {
              //     if (view === "month" &&
              //     absences?.find((event) =>
              //       moment(event.end).isSame(moment(date), "day")
              //     )) {
              //       startDateRange = false
              //     return "blue-absence";
              //     }
              //     return "blue-absence";
              //   }

              //   // SPECIAL DAYS
              //   if (
              //     view === "month" &&
              //     specialDays?.find((event) =>
              //       moment(event.start).isSame(moment(date), "day")
              //     )
              //   ) {
              //     startDateRange = true
              //     return "yellow-special";
              //   }

              //   if (startDateRange ) {
              //     if (view === "month" &&
              //     specialDays?.find((event) =>
              //       moment(event.end).isSame(moment(date), "day")
              //     )) {
              //       startDateRange = false
              //     return "yellow-special";
              //     }
              //     return "yellow-special";
              //   }
              // }}

              // GPT CLASSNAMES 
              tileClassName={({ date, view }) => {
                // NATIONAL HOLIDAYS
                if (
                  view === "month" &&
                  nationalFestivities?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  return "red-holiday";
                }

                // PENDING HOLIDAYS
                if (
                  view === "month" &&
                  pendingHolidays?.find((event) => 
                    moment(event.start).isSame(moment(date), "day") 
                  )
                ) {
                  return "orange-holiday";
                }

                // ACCEPTED HOLIDAYS
                if (
                  view === "month" &&
                  acceptedHolidays?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  return "green-holiday";
                }

                // REJECTED HOLIDAYS
                if (
                  view === "month" &&
                  rejectedHolidays?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  return "pink-holiday";
                }

                // ABSENCES
                if (
                  view === "month" &&
                  absences?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  return "blue-absence";
                }

                // SPECIAL DAYS
                if (
                  view === "month" &&
                  specialDays?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  return "yellow-special";
                }

                return "";
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
