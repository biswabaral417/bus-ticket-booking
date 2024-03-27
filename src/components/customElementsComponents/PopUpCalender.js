import React, { useState, useEffect, useRef } from "react";

//here a stack overflow code thanks  Ben Bud it worked support here = https://stackoverflow.com/users/1212039/ben-bud
function useOutsideAlerter(ref, setDatePickerVisiblity) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDatePickerVisiblity(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setDatePickerVisiblity]);
}
//thanks

export default function PopUpCalender({
  setFinalDate,
  setDatePickerVisiblity,
  monthName,
  finalDate,
}) {
  const currentDate = new Date();
  const currentyear = currentDate.getFullYear();
  const currentmonth = currentDate.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentyear);
  const [selectedMonth, setSelectedMonth] = useState({
    number: currentmonth,
    name: monthName(currentyear, currentmonth + 1),
  });

  const handleDateSelect = (e) => {
    e.stopPropagation();
    setFinalDate(
      new Date(selectedYear, selectedMonth.number, Number(e.target.textContent))
        .toLocaleString()
        .split(",")[0],
    );
    setDatePickerVisiblity(false);
  };

  const handlePrevMonth = (e) => {
    e.stopPropagation();

    setSelectedMonth((prevSelectedMonth) => {
      const newMonthNumber =
        prevSelectedMonth.number === 0 ? 11 : prevSelectedMonth.number - 1;
      const newYear = newMonthNumber === 11 ? selectedYear - 1 : selectedYear;
      setSelectedYear(newYear);
      const newMonthName = monthName(currentyear, newMonthNumber + 1);
      return { number: newMonthNumber, name: newMonthName };
    });
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();

    setSelectedMonth((prevSelectedMonth) => {
      const newMonthNumber =
        prevSelectedMonth.number === 11 ? 0 : prevSelectedMonth.number + 1;
      const newYear = newMonthNumber === 0 ? selectedYear + 1 : selectedYear;
      setSelectedYear(newYear);
      const newMonthName = monthName(currentyear, newMonthNumber + 1);
      return { number: newMonthNumber, name: newMonthName };
    });
  };

  const handleNextYear = (e) => {
    e.stopPropagation();

    setSelectedYear((prevYear) => prevYear + 1);
  };

  const handlePrevYear = (e) => {
    e.stopPropagation();

    setSelectedYear((prevYear) => prevYear - 1);
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const totalDays = daysInMonth(selectedYear, selectedMonth.number);
  const firstDay = new Date(selectedYear, selectedMonth.number, 1).getDay();

  const days = [];

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  const calendarDays = [];
  let blankCells = firstDay;

  while (blankCells > 0) {
    calendarDays.push("");
    blankCells--;
  }

  calendarDays.push(...days);
  const calenderRef = useRef(null);
  useOutsideAlerter(calenderRef, setDatePickerVisiblity);

  return (
    <div id="PopUpCalender" ref={calenderRef}>
      <div id="CalenderNavigation">
        <div id="Year_navigation" className="d-flx jcse">
          <button
            className="z_2 "
            type="button"
            onClick={handlePrevYear}
          ></button>
          <h5 className="">{selectedYear}</h5>
          <button
            className="z_2 "
            type="button"
            onClick={handleNextYear}
          ></button>
        </div>
        <div id="Month_navigation" className="d-flx jcse">
          <button
            className="z_2 "
            type="button"
            onClick={handlePrevMonth}
          ></button>
          <h5>{selectedMonth.name}</h5>
          <button
            className="z_2 "
            type="button"
            onClick={handleNextMonth}
          ></button>
        </div>
      </div>
      <div id="datesContainer">
        <div id="weekDayNames" className="d_grid d_g_7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
        </div>
        <div id="Dates" className="d_grid d_g_7">
          {calendarDays.map((day, index) => (
            <button
              type="button"
              key={index}
              className={`date ${day === "" ? "empty" : ""}`}
              onClick={handleDateSelect}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
