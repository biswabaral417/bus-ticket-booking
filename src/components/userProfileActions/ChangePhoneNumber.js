import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ChangePhoneNumber() {
  const ChangePhoneNumberInps = (e) => {
    const { name, value } = e.target;
    setChangePhoneNumberInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
  const ChangeThePhoneNumber = async () => {
    console.log(changePhoneNumberInputs)
    const res = await fetch('/api/changePhoneNumber', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(changePhoneNumberInputs),
      credentials: 'include'
      
    })
    const data = await res.json()
    console.log(data)
  }
  const [changePhoneNumberInputs, setChangePhoneNumberInputs] = useState({})

  

  return (
    <>
      <div>
        <div className="d-flx">
          <div id="Logincontainer" style={{ padding: "20px" }}>
            <h1 className="t_a_c">Change PhoneNumber</h1>
            <div
              id="changePhoneNumberloginInputs"
              className="d-flx flx_column"
              style={{ padding: "20px" }}
            >
              <div className="">
                <input
                  type='text'
                  className="LoginInputFeilds"
                  placeholder="old PhoneNumber"
                  name="oldPhoneNumber"
                  onChange={ChangePhoneNumberInps}
                  value={changePhoneNumberInputs.oldPhoneNumber === undefined ? "" : changePhoneNumberInputs.oldPhoneNumber}
                />
                <input
                  type='text'
                  className="LoginInputFeilds"
                  placeholder="new phone number"
                  name="newPhoneNumber"
                  onChange={ChangePhoneNumberInps}
                  value={changePhoneNumberInputs.newPhoneNumber === undefined ? "" : changePhoneNumberInputs.newPhoneNumber}
                />
                <div className='d-flx al_Items_C'>

                  <input
                    type='text'
                    className="LoginInputFeilds"
                    placeholder="confirm new PhoneNumber"
                    name="confirmNewPhoneNumber"
                    onChange={ChangePhoneNumberInps}
                    value={changePhoneNumberInputs.confirmNewPhoneNumber === undefined ? "" : changePhoneNumberInputs.confirmNewPhoneNumber}
                  />
                  
                </div>
              </div>
              <div>
                <button onClick={ChangeThePhoneNumber} id="loginBtn">Change PhoneNumber</button>
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
  );}
