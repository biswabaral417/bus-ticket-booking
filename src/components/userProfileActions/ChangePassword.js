import React, { useState } from "react";
import { Link } from 'react-router-dom'
import eyeSlashfill from "../../assets/icons/eye-slash-fill.svg";
import eyefill from "../../assets/icons/eye-fill.svg";

export default function ChangePassword() {
  const ChangePasswordInps = (e) => {
    const { name, value } = e.target;
    setInputTypeForPassword((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
  const ChangeThePassword = async () => {
    const res = fetch('/api/chagePassword', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputTypeForPassword),
      credentials: "include"
    })
    const data = await res
    console.log(data)
  }
  const [inputTypeForPassword, setInputTypeForPassword] = useState("password");
  const [iconForPasswordVisiblity, setIconForPasswordVisiblity] = useState(eyeSlashfill)

  const switchPasswordInpType = () => {
    setInputTypeForPassword(
      inputTypeForPassword === "password" ? "text" : "password",
    );
    setIconForPasswordVisiblity(
      iconForPasswordVisiblity === eyefill ? eyeSlashfill : eyefill,
    );
  }

  return (
    <>
      <div>
        <div className="d-flx">
          <div id="Logincontainer" style={{ padding: "20px" }}>
            <h1 className="t_a_c">Change Password</h1>
            <div
              id="loginInputs"
              className="d-flx flx_column"
              style={{ padding: "20px" }}
            >
              <div className="">
                <input
                  type={inputTypeForPassword}
                  className="LoginInputFeilds"
                  placeholder="old Password"
                  name="oldPassword"
                  onChange={switchPasswordInpType}
                />
                <input
                  type={inputTypeForPassword}
                  className="LoginInputFeilds"
                  placeholder="new password"
                  name="newPassword"
                  onChange={switchPasswordInpType}
                />
                <div className='d-flx al_Items_C'>

                  <input
                    type={inputTypeForPassword}
                    className="LoginInputFeilds"
                    placeholder="confirm new password"
                    name="confirmNewPassword"
                    onChange={ChangePasswordInps}
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
                <button onClick={ChangeThePassword} id="loginBtn">Change Password</button>
              </div>
            </div>

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
      </div>
    </>
  );
}