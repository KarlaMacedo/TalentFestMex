/* eslint-disable react/prop-types */
// import { useMemo } from "react";
// import { DateLocalizer, Navigate, ViewProps, Views } from "react-big-calendar";
import { Navigate } from "react-big-calendar";
import Calendar from "react-calendar";
import moment from "moment";
import './calendar.css'
import { Tune } from "@mui/icons-material";

export default function YearView({
  date,
  localizer,
  onView,
  onNavigate,
  nationalFestivities,
  pendingHolidays,
  acceptedHolidays, rejectedHolidays, absences, specialDays
}) {
  console.log(specialDays);

  const currRange = YearView.range(date, { localizer });

  let isPending = false
  let isRejected = false
  let isAccepted = false
  let isAbsence = false
  let isSpecial = false

  return (
    <div >
      {currRange.map((month, index) => {
        return (
          <div key={index}>
            <Calendar
              activeStartDate={month}
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
                  isPending = true
                  // setIsPending()
                  return 'orange-holiday'
                }

                // if (isPending) {
                //   if (view === "month" &&
                //     pendingHolidays?.find((event) =>
                //       moment(event.end).isSame(moment(date), "day")
                //     )) {
                //     isPending = false
                //     return "orange-holiday";
                //   }
                //   return "orange-holiday";
                // }

                if (
                  view === "month" &&
                  pendingHolidays?.find((event) =>
                    moment(event.end).isSame(moment(date), "day")
                  )
                ) {
                  return 'orange-holiday'
                }

                // ACCEPTED HOLIDAYS
                if (
                  view === "month" &&
                  acceptedHolidays?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                ) {
                  isAccepted = true
                  return "green-holiday";
                }

                // if (isAccepted) {
                //   if (view === "month" &&
                //     acceptedHolidays?.find((event) =>
                //       moment(event.end).isSame(moment(date), "day")
                //     )) {
                //     isAccepted = false
                //     return "green-holiday";
                //   }
                //   return "green-holiday";
                // }

                if (
                  view === "month" &&
                  acceptedHolidays?.find((event) =>
                    moment(event.end).isSame(moment(date), "day")
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
                  isRejected = true
                  return "pink-holiday";
                }

                // if (isRejected) {
                //   if (view === "month" &&
                //     rejectedHolidays?.find((event) =>
                //       moment(event.end).isSame(moment(date), "day")
                //     )) {
                //     isRejected = false
                //     return "pink-holiday";
                //   }
                //   return "pink-holiday";
                // }

                if (
                  view === "month" &&
                  rejectedHolidays?.find((event) =>
                    moment(event.end).isSame(moment(date), "day")
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

                if (
                  view === "month" &&
                  absences?.find((event) =>
                    moment(event.end).isSame(moment(date), "day")
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
                  isSpecial = true
                  return "yellow-special";
                }

                // if (isSpecial) {
                //   if (view === "month" &&
                //     specialDays?.find((event) =>
                //       moment(event.end).isSame(moment(date), "day")
                //     )) {
                //     isSpecial = false
                //     return "yellow-special";
                //   }
                //   return "yellow-special";
                // }

                if (
                  view === "month" &&
                  specialDays?.find((event) =>
                    moment(event.end).isSame(moment(date), "day")
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
