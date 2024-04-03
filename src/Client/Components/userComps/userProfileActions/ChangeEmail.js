import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ChangeEmail() {
  const ChangeEmailInps = (e) => {
    const { name, value } = e.target;
    setChangeEmailInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const ChangeTheEmail = async () => {
    const res = await fetch("/api/changeEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeEmailInputs),
      credentials: "include",
    });
    const data = await res.json();
    ///TODO something missing here too
  };
  const [changeEmailInputs, setChangeEmailInputs] = useState({});

  return (
    <>
      <div>
        <div className="d-flx">
          <div id="Logincontainer" style={{ padding: "20px" }}>
            <h1 className="t_a_c">Change Email</h1>
            <div
              id="changeEmailloginInputs"
              className="d-flx flx_column"
              style={{ padding: "20px" }}
            >
              <div className="">
                <input
                  type="text"
                  className="LoginInputFeilds"
                  placeholder="old Email"
                  name="oldEmail"
                  onChange={ChangeEmailInps}
                  value={
                    changeEmailInputs.oldEmail === undefined
                      ? ""
                      : changeEmailInputs.oldEmail
                  }
                />
                <input
                  type="text"
                  className="LoginInputFeilds"
                  placeholder="new email"
                  name="newEmail"
                  onChange={ChangeEmailInps}
                  value={
                    changeEmailInputs.newEmail === undefined
                      ? ""
                      : changeEmailInputs.newEmail
                  }
                />
                <div className="d-flx al_Items_C">
                  <input
                    type="text"
                    className="LoginInputFeilds"
                    placeholder="confirm new Email"
                    name="confirmNewEmail"
                    onChange={ChangeEmailInps}
                    value={
                      changeEmailInputs.confirmNewEmail === undefined
                        ? ""
                        : changeEmailInputs.confirmNewEmail
                    }
                  />
                </div>
              </div>
              <div>
                <button onClick={ChangeTheEmail} id="loginBtn">
                  Change Email
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
