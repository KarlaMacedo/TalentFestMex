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

                // ACCEPTED HOLODAYS
                if (view === "month") {
                  const isHolidayStart = acceptedHolidays?.some((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  );

                  if (isHolidayStart) {
                    startDateRange = true;
                    return "green-holiday";
                  } else if (startDateRange) {
                    const isHolidayEnd = acceptedHolidays?.some((event) =>
                      moment(event.end).isSame(moment(date), "day")
                    );

                    if (isHolidayEnd) {
                      startDateRange = false;
                      return "green-holiday";
                    }
                  }
                }

                // REJECTED HOLIDAYS
                if (view === "month") {
                  const isHolidayStart = rejectedHolidays?.some((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  );

                  if (isHolidayStart) {
                    startDateRange = true;
                    return "pink-holiday";
                  } else if (startDateRange) {
                    const isHolidayEnd = rejectedHolidays?.some((event) =>
                      moment(event.end).isSame(moment(date), "day")
                    );

                    if (isHolidayEnd) {
                      startDateRange = false;
                      return "pink-holiday";
                    }
                  }
                }

                // PENDING HOLIDAYS
                if (view === "month") {
                  const isHolidayStart = pendingHolidays?.some((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  );

                  if (isHolidayStart) {
                    startDateRange = true;
                    return "orange-holiday";
                  } else if (startDateRange) {
                    const isHolidayEnd = pendingHolidays?.some((event) =>
                      moment(event.end).isSame(moment(date), "day")
                    );

                    if (isHolidayEnd) {
                      startDateRange = false;
                      return "orange-holiday";
                    }
                  }
                }

                // ABSENCES
                if (view === "month") {
                  const isHolidayStart = absences?.some((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  );

                  if (isHolidayStart) {
                    startDateRange = true;
                    return "blue-absence";
                  } else if (startDateRange) {
                    const isHolidayEnd = absences?.some((event) =>
                      moment(event.end).isSame(moment(date), "day")
                    );

                    if (isHolidayEnd) {
                      startDateRange = false;
                      return "blue-absence";
                    }
                  }
                }

                // SPECIAL DAYS
                if (view === "month") {
                  const isHolidayStart = specialDays?.some((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  );

                  if (isHolidayStart) {
                    startDateRange = true;
                    return "yellow-special";
                  } else if (startDateRange) {
                    const isHolidayEnd = specialDays?.some((event) =>
                      moment(event.end).isSame(moment(date), "day")
                    );

                    if (isHolidayEnd) {
                      startDateRange = false;
                      return "yellow-special";
                    }
                  }
                }
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
