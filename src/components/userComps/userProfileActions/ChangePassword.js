import React, { useState } from "react";
import { Link } from "react-router-dom";
import eyeSlashfill from "../../../assets/icons/eye-slash-fill.svg";
import eyefill from "../../../assets/icons/eye-fill.svg";

export default function ChangePassword() {
  const ChangePasswordInps = (e) => {
    const { name, value } = e.target;
    setChangePasswordinputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const ChangeThePassword = async () => {
    console.log(changePasswordinputs);
    const res = await fetch("/api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changePasswordinputs),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
  };
  const [changePasswordinputs, setChangePasswordinputs] = useState({});
  const [inputTypeForPassword, setInputTypeForPassword] = useState("password");
  const [iconForPasswordVisiblity, setIconForPasswordVisiblity] =
    useState(eyeSlashfill);

  const switchPasswordInpType = () => {
    setInputTypeForPassword(
      inputTypeForPassword === "password" ? "text" : "password",
    );
    setIconForPasswordVisiblity(
      iconForPasswordVisiblity === eyefill ? eyeSlashfill : eyefill,
    );
  };

  return (
    <>
      <div>
        <div className="d-flx">
          <div id="Logincontainer" style={{ padding: "20px" }}>
            <h1 className="t_a_c">Change Password</h1>
            <div
              id="changepasswordloginInputs"
              className="d-flx flx_column"
              style={{ padding: "20px" }}
            >
              <div className="">
                <input
                  type={inputTypeForPassword}
                  className="LoginInputFeilds"
                  placeholder="old Password"
                  name="oldPassword"
                  onChange={ChangePasswordInps}
                  value={
                    changePasswordinputs.oldPassword === undefined
                      ? ""
                      : changePasswordinputs.oldPassword
                  }
                />
                <input
                  type={inputTypeForPassword}
                  className="LoginInputFeilds"
                  placeholder="new password"
                  name="newPassword"
                  onChange={ChangePasswordInps}
                  value={
                    changePasswordinputs.newPassword === undefined
                      ? ""
                      : changePasswordinputs.newPassword
                  }
                />
                <div className="d-flx al_Items_C">
                  <input
                    type={inputTypeForPassword}
                    className="LoginInputFeilds"
                    placeholder="confirm new password"
                    name="confirmNewPassword"
                    onChange={ChangePasswordInps}
                    value={
                      changePasswordinputs.confirmNewPassword === undefined
                        ? ""
                        : changePasswordinputs.confirmNewPassword
                    }
                  />
                  <button
                    id="PasswordShowHide"
                    style={{
                      background: `no-repeat url(${iconForPasswordVisiblity}) center/contain`,
                    }}
                    onClick={switchPasswordInpType}
                  ></button>
                </div>
              </div>
              <div>
                <button onClick={ChangeThePassword} id="loginBtn">
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div id="SignUpOptions">
            <h1>Bus Sewa </h1>
            <p>Connecting people around nepal</p>
            <h3>New Here?</h3>
            <p>
              Create an account to get set travelling by clicking button below.
            </p>
            <Link to="/signUp">
              <button id="toSignUp">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
