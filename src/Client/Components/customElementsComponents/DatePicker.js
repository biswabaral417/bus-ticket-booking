import React from "react";
import PopUpCalender from "./PopUpCalender";

const CustomDatePicker = ({
  DatePickerVisiblity,
  setDatePickerVisiblity,
  finalDate,
  setFinalDate,
}) => {
  const monthName = (year, month) => {
    return new Date(year, month, 1).toUTCString().split(" ")[2];
  };
  const dpv = (e) => {
    e.stopPropagation();
    setDatePickerVisiblity(!DatePickerVisiblity);
  };

  return (
    <>
      <span
        className="d-flx jcse"
        style={{
          width: "100px",
          height: "35px",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <div>
          <p>
            {finalDate.split("/")[1]}&nbsp;
            {console.log(finalDate.split("/")[0])}
            {monthName(2024, Number(finalDate.split("/")[0]))}
          </p>
          <p>{finalDate.split("T")[0].split("/")[2]}</p>
        </div>
        <div>
          <button type="button" id="DatePickerBtn" onClick={dpv}></button>
        </div>
        {DatePickerVisiblity && (
          <PopUpCalender
            setFinalDate={setFinalDate}
            setDatePickerVisiblity={setDatePickerVisiblity}
            monthName={monthName}
            finalDate={finalDate}
          />
        )}
      </span>
    </>
  );
};

export default CustomDatePicker;
