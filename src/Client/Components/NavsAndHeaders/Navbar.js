import React, { useContext } from "react";
import { NavContext } from "../../contexts/NavContext";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
export default function Navbar() {
  const { Auth } = useContext(UserContext);
  const { isDD, isDDvisible, setIsDDvisible } = useContext(NavContext);
  const hk = () => {
    setIsDDvisible(false);
  };
  const isAdminPath = window.location.pathname.startsWith("/admin");
  return (
    <nav id="theNavbar" className="d-flx al_Items_c">
      <ul
        className={`${isDD ? `DD ${isDDvisible ? "d-flx" : "d_none"}` : "d-flx"
          } al_Items_c`}
        id="showHide"
      >
        <button
          id="hide"
          className={isDD ? `${isDDvisible ? "d_block" : "d_none"}` : "d_none"}
          onClick={hk}
        ></button>

        <li>
          <NavLink className="td_none" to={`${isAdminPath?"/admin/":"/"}`} >
            <button className="NavButton">Home</button>
          </NavLink>
        </li>
        {
          isAdminPath ? (<>
          <li>
              <NavLink className="td_none" to="/admin/addbus">
                <button className="NavButton ">Add Bus</button>
              </NavLink>
            </li>
            <li>
              <NavLink className="td_none" to="/admin/addroutes">
                <button className="NavButton ">Add Routes</button>
              </NavLink>
            </li>
            <li>
              <NavLink className="td_none" to="/admin/modifybus">
                <button className="NavButton ">Modify Bus</button>
              </NavLink>
            </li>
          </>)
            : (<><li>
              <NavLink className="td_none" to="/services">
                <button className="NavButton ">Services</button>
              </NavLink>
            </li>
              <li>
                <NavLink className="td_none" to="/mytickets">
                  <button className="NavButton btn3">My Tickets</button>
                </NavLink>
              </li>
            </>)
        }

      </ul>
      <ul className="d-flx al_Items_c ml_auto">
        {
          !isAdminPath &&
          <li>
            <NavLink className="td_none" to="/customer_care">
              <button className="NavButton" id="customerCara"></button>
            </NavLink>
          </li>
        }
        <li>
          <NavLink className="td_none" to={`${Auth ? "/account" : "/login"}`}>
            <button className="NavButton" id="myAccount"></button>
          </NavLink>
        </li>
      </ul>
    </nav >
  );
}
