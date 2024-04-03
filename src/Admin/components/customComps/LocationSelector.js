import React from "react";
import suggestLocs from "../../../assets/json/suggestLocation.json";

export default function LocationSelector({ value, setter, pos, setvis }) {
  const setLocName = (e) => {
    if (pos==='FromLocationInp') {
      setter((prev) => ({
        ...prev,
        FromLocationInp: e.target.textContent
      }))
    }
    else{
      setter((prev) => ({
        ...prev,
        ToLocationInp: e.target.textContent
      }))
    }
    setvis(false);
  };
  return (
    <div className={` d-flx flx_column`} id={`${pos+"Suggestion"}`}>
      {suggestLocs
        .filter((s) => s.name.toLowerCase().includes(value.toLowerCase()))
        .map((loc, i) => (
          <button type="button" key={`loc_${i}`} onClick={setLocName}>
            {loc.name}
          </button>
        ))}
    </div>
  );
}
