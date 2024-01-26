import React from "react";
import PopUpCalender from "./PopUpCalender";

const CustomDatePicker = ({ DatePickerVisiblity, setDatePickerVisiblity,finalDate,setFinalDate }) => {
  const monthName = (year, month) => {
    return new Date(year, month, 1).toUTCString().split(" ")[2];
  };
  const dpv = (e) => {
    e.stopPropagation();
    setDatePickerVisiblity(!DatePickerVisiblity);
  };
  console.log(new Date(JSON.parse(JSON.stringify(finalDate))))

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
            {finalDate.toString().split(" ")[2]}&nbsp;
            {monthName(
              2024,
              Number(finalDate.toISOString().split("T")[0].split("-")[1]),
            )}
          </p>
          <p>{finalDate.toISOString().split("T")[0].split("-")[0]}</p>
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
