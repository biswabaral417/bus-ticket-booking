import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import Bliptext from "../../customElementsComponents/Bliptext";

export default function UserAccount() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  const [responseData, setResponseData] = useState(null);
  const [blipVisiblity, setBlipVisiblity] = useState(false);
  const Logout = async () => {
    const res = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status === 200) {
      setResponseData(data.success);
      setBlipVisiblity(true);
      setTimeout(() => {
        navigate("/login");
        setBlipVisiblity(false);
      }, 1500);
    } else {
      setResponseData(data.error);
      setBlipVisiblity(true);
      setTimeout(() => {
        setBlipVisiblity(false);
      }, 1500);
    }
    console.log(data);
  };
  return (
    <div style={{ padding: "20px" }} className="d-flx">
      <div id="ProfileContainerInner">
        <div id="userProfileImage" className="d-flx j_Content-C">
          <img id="UserProfileImageLarge" src="" alt="" />
        </div>
        <div id="userInformation">
          <h2 className="t_a_c" style={{ paddingTop: "10px" }}>
            {userData.Name}
          </h2>
          <h4 className="t_a_c" style={{ paddingTop: "10px" }}>
            Phone : {userData.phoneNo}
          </h4>
          <h4 className="t_a_c" style={{ paddingTop: "10px" }}>
            Email : {userData.email}
          </h4>
          <h4 className="t_a_c" style={{ paddingTop: "10px" }}>
            Address : {userData.Address}
          </h4>
        </div>
        <div
          id="UserProfileActions"
          style={{ marginTop: "40px" }}
          className="d-flx j_Content-C"
        >
          <ul style={{ listStyle: "none" }}>
            <li>
              <Link to="/changePassword" className="td_none">
                <button className="UA_button">Change Password</button>
              </Link>
            </li>
            <li>
              <Link to="/changeEmail" className="td_none">
                <button className="UA_button">Change Email</button>
              </Link>
            </li>
            <li>
              <Link to="/changeAddress" className="td_none">
                <button className="UA_button">Change Home Address</button>
              </Link>
            </li>
            <li>
              <Link to="/changePhone" className="td_none">
                <button className="UA_button">Change Phone Number</button>
              </Link>
            </li>
            <li>
              <Link to="/changeProfileImage" className="td_none">
                <button className="UA_button">Change Profile Image</button>
              </Link>
            </li>
            <li>
              <button
                className="UA_button"
                style={{ cursor: "pointer" }}
                onClick={Logout}
              >
                Log Out
              </button>
            </li>
          </ul>
          {blipVisiblity && <Bliptext text={responseData} />}
        </div>
      </div>
    </div>
  );
}
