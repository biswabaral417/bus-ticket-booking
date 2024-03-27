import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ChangeAddress() {
  const ChangeAddressInps = (e) => {
    const { name, value } = e.target;
    setChangeAddressInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const ChangeTheAddress = async () => {
    console.log(changeAddressInputs);
    const res = await fetch("/api/changeAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changeAddressInputs),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
  };
  const [changeAddressInputs, setChangeAddressInputs] = useState({});

  return (
    <>
      <div>
        <div className="d-flx">
          <div id="Logincontainer" style={{ padding: "20px" }}>
            <h1 className="t_a_c">Change Address</h1>
            <div
              id="changeAddressloginInputs"
              className="d-flx flx_column"
              style={{ padding: "20px" }}
            >
              <div className="">
                <input
                  type="text"
                  className="LoginInputFeilds"
                  placeholder="old Address"
                  name="oldAddress"
                  onChange={ChangeAddressInps}
                  value={
                    changeAddressInputs.oldAddress === undefined
                      ? ""
                      : changeAddressInputs.oldAddress
                  }
                />
                <input
                  type="text"
                  className="LoginInputFeilds"
                  placeholder="new address"
                  name="newAddress"
                  onChange={ChangeAddressInps}
                  value={
                    changeAddressInputs.newAddress === undefined
                      ? ""
                      : changeAddressInputs.newAddress
                  }
                />
                <div className="d-flx al_Items_C">
                  <input
                    type="text"
                    className="LoginInputFeilds"
                    placeholder="confirm new Address"
                    name="confirmNewAddress"
                    onChange={ChangeAddressInps}
                    value={
                      changeAddressInputs.confirmNewAddress === undefined
                        ? ""
                        : changeAddressInputs.confirmNewAddress
                    }
                  />
                </div>
              </div>
              <div>
                <button onClick={ChangeTheAddress} id="loginBtn">
                  Change Address
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
