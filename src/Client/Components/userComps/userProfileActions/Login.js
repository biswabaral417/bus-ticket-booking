import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeSlashfill from "../../../../assets/icons/eye-slash-fill.svg";
import eyefill from "../../../../assets/icons/eye-fill.svg";
import Bliptext from "../../customElementsComponents/Bliptext";
import { UserContext } from "../../../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(UserContext);
  const [inputTypeForPassword, setInputTypeForPassword] = useState("password");
  const [iconForPasswordVisiblity, setIconForPasswordVisiblity] =
    useState(eyeSlashfill);
  const switchInpType = () => {
    setInputTypeForPassword(
      inputTypeForPassword === "password" ? "text" : "password",
    );
    setIconForPasswordVisiblity(
      iconForPasswordVisiblity === eyefill ? eyeSlashfill : eyefill,
    );
  };
  const [loginInputs, setLoginInputs] = useState({});

  const ChangeLoginInps = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const [responseData, setResponseData] = useState(null);
  const [blipVisiblity, setBlipVisiblity] = useState(false);
  const login = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInputs),
      });

      const data = await res.json();


      if (res.status === 201) {
        setResponseData(data.success);
        setAuth(true);
        setBlipVisiblity(true);
        setTimeout(() => {
          setBlipVisiblity(false);
          navigate("/account");
        }, 1500);
      } else {
        setResponseData(data.error);
        setBlipVisiblity(true);
        setTimeout(() => {
          setBlipVisiblity(false);
        }, 1500);
      }
    } catch (error) {
    }
  };
  return (
    <div className="d-flx">
      <div id="Logincontainer" style={{ padding: "20px" }}>
        <h1 className="t_a_c">Login to your Account</h1>
        <div
          id="loginInputs"
          className="d-flx flx_column"
          style={{ padding: "20px" }}
        >
          <input
            type="text"
            className="LoginInputFeilds"
            onChange={ChangeLoginInps}
            name="email"
            placeholder="email"
          />
          <div className="d-flx al_Items_C">
            <input
              type={inputTypeForPassword}
              className="LoginInputFeilds"
              placeholder="password"
              name="password"
              onChange={ChangeLoginInps}
            />
            <button
              id="LoginPasswordShowHide"
              style={{
                background: `no-repeat url(${iconForPasswordVisiblity}) center/contain`,
              }}
              onClick={switchInpType}
            ></button>
          </div>
          <div>
            <button onClick={login} id="loginBtn">
              Login
            </button>
          </div>
        </div>
        {blipVisiblity && <Bliptext text={responseData} />}
      </div>
      <div id="SignUpOptions">
        <h1>Bus Sewa </h1>
        <p>Connecting people around nepal</p>
        <h3>New Here?</h3>
        <p>Create an account to get set travelling by clicking button below.</p>
        <Link to="/signUp">
          <button id="toSignUp">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
