import React, { useContext } from "react";
import { NavContext } from "../contexts/NavContext";
import Navbar from "./Navbar";

export default function Header() {
  const { isDD, isDDvisible, setIsDDvisible } = useContext(NavContext);
  const hk = () => {
    setIsDDvisible(true);
  };
  return (
    <header className="d-flx al_Items_C">
      <div>
        <button
          id="Nav_Drop_Down"
          className={isDD ? `${isDDvisible ? "d_none" : "d_block"}` : "d_none"}
          onClick={hk}
        ></button>
      </div>
      <div id="logo" style={{ padding: "10px" }}>
        <img
          id="logoImg"
          style={{ width: "45px", height: "45px" }}
          src="./logo192.png"
          alt=""
        />
      </div>
      <Navbar />
    </header>
  );
}
