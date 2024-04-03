import React from "react";
import DatePicker from "../../customElementsComponents/DatePicker";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelector from "../../customElementsComponents/LocationSelector";
import CurrentOffers from "../OrtherComps/CurrentOffers";

export default function UserServices() {
  const navigate = useNavigate();
  const [finalDate, setFinalDate] = useState(
    new Date().toLocaleString().split(",")[0],
  );
  const [DatePickerVisiblity, setDatePickerVisiblity] = useState(false);
  const showit = () => {
    setDatePickerVisiblity(!DatePickerVisiblity);
  };
  const [suggentionsFromVisiblity, setSuggentionsFromVisiblity] =
    useState(false);
  const [suggentionsToVisiblity, setSuggentionsToVisiblity] = useState(false);
  const ToLocationEl = useRef(null);
  const fromLocationEl = useRef(null);
  const [fromLocation, setFromLocation] = useState("");
  const [ToLocation, setToLocation] = useState("");
  const [pos, setPos] = useState("");

  const HandleLocationChange = (e) => {
    if (e.target.id === "FromLocation") {
      setPos("from");
      setSuggentionsFromVisiblity(e.target.value !== "");
      setSuggentionsToVisiblity(false);
    } else {
      setPos("to");
      setSuggentionsFromVisiblity(false);
      setSuggentionsToVisiblity(e.target.value !== "");
    }
    setFromLocation(fromLocationEl.current.value);
    setToLocation(ToLocationEl.current.value);
  };
  const swichLoc = () => {
    setSuggentionsToVisiblity(false);
    setSuggentionsFromVisiblity(false);
    const tempLocation = fromLocation;
    setFromLocation(ToLocation);
    setToLocation(tempLocation);
  };
  const ShowSearchResults = () => {
    navigate("/searchResults", {
      replace: true,
      state: { finalDate, ToLocation, fromLocation },
    });
  };

  return (
    <>
      <div style={{ background: "red", padding: "10px" }}>
        <h1 className="t_a_c" style={{ padding: "20px", color: "white" }}>
          Travel all Over Nepal
        </h1>
        <form action="" onSubmit={ShowSearchResults}>
          <div id="Search_container" className="d-flx j_Content-C al_Items_C ">
            <div className="SearchlocationsDiv borderRightFormDiv formBg d-flx flx_column   j_Content-C">
              <label
                htmlFor="FromLocation"
                className="SearchLabel locationsLabel"
              >
                From
              </label>
              <input
                ref={fromLocationEl}
                autoComplete="off"
                className="locationsInp"
                id="FromLocation"
                type="text"
                placeholder="eg: jhapa"
                onChange={HandleLocationChange}
                value={fromLocation}
              />
              {suggentionsFromVisiblity && (
                <LocationSelector
                  value={fromLocation}
                  setter={setFromLocation}
                  pos={pos}
                  setvis={setSuggentionsFromVisiblity}
                />
              )}
            </div>

            <button id="switch" type="button" onClick={swichLoc}></button>

            <div className="SearchlocationsDiv borderRightFormDiv formBg d-flx flx_column j_Content-C">
              <label
                htmlFor="ToLocation"
                className="SearchLabel locationsLabel"
              >
                To
              </label>
              <input
                ref={ToLocationEl}
                autoComplete="off"
                className="locationsInp"
                id="ToLocation"
                type="text"
                placeholder="eg: kathmandu"
                onChange={HandleLocationChange}
                value={ToLocation}
              />
              {suggentionsToVisiblity && (
                <LocationSelector
                  value={ToLocation}
                  setter={setToLocation}
                  pos={pos}
                  setvis={setSuggentionsToVisiblity}
                />
              )}
            </div>

            <div
              className=" formBg d-flx flx_column j_Content-C"
              onClick={showit}
            >
              <label htmlFor="DateInp" className="SearchLabel d_block">
                Date
              </label>
              <DatePicker
                DatePickerVisiblity={DatePickerVisiblity}
                setDatePickerVisiblity={setDatePickerVisiblity}
                finalDate={finalDate}
                setFinalDate={setFinalDate}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "green",
                height: " 120px",
                padding: "20px",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Search Buses
            </button>
          </div>
        </form>
        <h1 className="t_a_c" style={{ padding: "20px", color: "white" }}>
          Best Prices in Nepal
        </h1>
        <div></div>
      </div>
      <CurrentOffers />
    </>
  );
}
