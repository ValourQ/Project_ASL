import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/history/Calendar.module.css";

import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [open, setOpen] = useState(false);

  const [month, setMonth] = useState(0);

  const year = 2026;

  const calendarRef = useRef(null);

  useEffect(() => {
    function handleOutside(event) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const prevMonth = () => {
    if (month > 0) {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month < 11) {
      setMonth(month + 1);
    }
  };

  const selectDate = (day) => {
    const value = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    setSelectedDate(value);

    setOpen(false);
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className={styles.empty}
        ></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const value = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      days.push(
        <button
          key={day}
          className={`${styles.day} ${
            selectedDate === value
              ? styles.selected
              : ""
          }`}
          onClick={() => selectDate(day)}
        >
          {day}
        </button>
      );
    }

    return days;
  };
    return (
    <div className={styles.calendarWrapper} ref={calendarRef}>
      {/* Calendar Button */}

      <button
        className={styles.calendarButton}
        onClick={() => setOpen(!open)}
      >
        <FiCalendar className={styles.calendarIcon} />

        <span>
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Select Date"}
        </span>
      </button>

      {/* Popup */}

      {open && (
        <div className={styles.popup}>

          {/* Header */}

          <div className={styles.header}>

            <button
              className={styles.navButton}
              onClick={prevMonth}
              disabled={month === 0}
            >
              <FiChevronLeft />
            </button>

            <h3>
              {months[month]} {year}
            </h3>

            <button
              className={styles.navButton}
              onClick={nextMonth}
              disabled={month === 11}
            >
              <FiChevronRight />
            </button>

          </div>

          {/* Week Days */}

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <div
                key={day}
                className={styles.weekDay}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}

          <div className={styles.daysGrid}>
            {renderDays()}
          </div>

          {/* Footer */}

          <div className={styles.footer}>

            <button
              className={styles.footerButton}
              onClick={() => {
                setSelectedDate("2026-01-01");
                setMonth(0);
                setOpen(false);
              }}
            >
              Today
            </button>

            <button
              className={styles.footerButton}
              onClick={() => {
                setSelectedDate("");
                setOpen(false);
              }}
            >
              Clear
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Calendar;