import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eyeSlashfill from "../../assets/icons/eye-slash-fill.svg";
import eyefill from "../../assets/icons/eye-fill.svg";
import Bliptext from "../customElementsComponents/Bliptext";

export default function Signup() {
  const [inputTypeForPassword, setInputTypeForPassword] = useState("password");
  const [iconForPasswordVisiblity, setIconForPasswordVisiblity] =
    useState(eyeSlashfill);

  //input states
  const regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const regexPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*0-9])(.{8,})$/;

  const notAroboRef = useRef("null");
  const AgreedTCRef = useRef("null");
  const [signUpInp, setSignUpInp] = useState({});
  const ChangeSignUpInp = (e) => {
    const { name, value } = e.target;
    setSignUpInp((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  //invalid inputs ref

  const switchInpType = () => {
    setInputTypeForPassword(
      inputTypeForPassword === "password" ? "text" : "password",
    );
    setIconForPasswordVisiblity(
      iconForPasswordVisiblity === eyefill ? eyeSlashfill : eyefill,
    );
  };
  const [responseData, setResponseData] = useState(null);
  const [blipVisiblity, setBlipVisiblity] = useState(false);
  const signUpSubmit = async () => {
    //validation
    if (!showInpError()) {
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInp),
      });
      const data = await res.json();
      if (res.status === 201) {
        setResponseData(data.success);
        setBlipVisiblity(true);
        setTimeout(() => {
          setBlipVisiblity(false);
        }, 1500);
      } else {
        setResponseData(data.error);
        setBlipVisiblity(true);
        setTimeout(() => {
          setBlipVisiblity(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //error refs
  const fnameError = useRef(null);
  const lnameError = useRef(null);
  const phoneNoError = useRef(null);
  const emailError = useRef(null);
  const passwordError = useRef(null);
  const cpasswordError = useRef(null);
  const addressError = useRef(null);
  const tACError = useRef(null);
  const notArobotError = useRef(null);

  const showInpError = () => {
    if (signUpInp.fName === undefined || signUpInp.fName.length < 3) {
      fnameError.current.textContent =
        "* first name must be at least 3 letters";
      return false;
    } else {
      fnameError.current.textContent = "";
    }
    if (signUpInp.lName === undefined || signUpInp.lName.length < 3) {
      lnameError.current.textContent = "* last name must be at least 3 letters";
      return false;
    } else {
      lnameError.current.textContent = "";
    }
    if (
      signUpInp.phoneNo === undefined ||
      signUpInp.phoneNo.length < 9 ||
      isNaN(Number(signUpInp.phoneNo))
    ) {
      phoneNoError.current.textContent =
        "*phone number must be a number and atleat 10 digits";
      return false;
    } else {
      phoneNoError.current.textContent = "";
    }
    if (signUpInp.email === undefined || !regexEmail.test(signUpInp.email)) {
      emailError.current.textContent = "* invalid email";
      return false;
    } else {
      emailError.current.textContent = "";
    }
    if (
      signUpInp.password === undefined ||
      !regexPassword.test(signUpInp.password)
    ) {
      passwordError.current.textContent =
        "* password must have 1 capital 1 special character and at least 8 characters";
      return false;
    } else {
      passwordError.current.textContent = "";
    }
    if (signUpInp.password !== signUpInp.cPassword) {
      cpasswordError.current.textContent = "* passwords do not match";
    } else {
      cpasswordError.current.textContent = "";
    }
    if (!notAroboRef.current.checked) {
      notArobotError.current.textContent = "*";
      return false;
    } else {
      notArobotError.current.textContent = "";
    }
    if (!AgreedTCRef.current.checked) {
      tACError.current.textContent = "*";
      return false;
    } else {
      tACError.current.textContent = "";
    }
    return true;
  };

  useEffect(() => {
    showInpError();
  });

  return (
    <div className="d-flx">
      <div className="d-flx flx_column" style={{ padding: "20px" }}>
        <h1>Greetings User!</h1>
        <div id="names" className="d-flx">
          <div>
            <input
              type="text"
              name="fName"
              placeholder="First Name"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["fName"] || ""}
            />
            <span ref={fnameError} className="error "></span>
          </div>
          <div>
            <input
              type="text"
              name="lName"
              placeholder="Last Name"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["lName"] || ""}
            />
            <span ref={lnameError} className="error"></span>
          </div>
        </div>
        <div className="d-flx">
          <div>
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone Number"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["phoneNo"] || ""}
            />
            <span ref={phoneNoError} className="error"></span>
          </div>
          <div>
            <input
              type="text"
              name="Address"
              placeholder="Address"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["Address"] || ""}
            />
            <span ref={addressError} className="error"></span>
          </div>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="signUpInputs"
            onChange={ChangeSignUpInp}
            value={signUpInp["email"] || ""}
          />
          <span ref={emailError} className="error"></span>
        </div>
        <div className="d-flx al_Items_C">
          <div>
            <input
              type={inputTypeForPassword}
              name="password"
              placeholder="enter password"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["password"] || ""}
            />
            <span ref={passwordError} className="error"></span>
          </div>
          <div>
            <input
              type={inputTypeForPassword}
              name="cPassword"
              placeholder="confirm password"
              className="signUpInputs"
              onChange={ChangeSignUpInp}
              value={signUpInp["cPassword"] || ""}
            />
            <span ref={cpasswordError} className="error"></span>
          </div>
          <button
            type="button"
            id="LoginPasswordShowHide"
            style={{
              background: `no-repeat url(${iconForPasswordVisiblity}) center/contain`,
            }}
            onClick={switchInpType}
          ></button>
        </div>
        <div className="">
          <label htmlFor="notArobot">i am not a robot</label>
          <input
            ref={notAroboRef}
            type="checkbox"
            id="notArobot"
            style={{ marginLeft: "30px" }}
          />
          <span ref={notArobotError} className="error"></span>
        </div>
        <div>
          <label htmlFor="AgreeTermsAndConditions">
            i agree to{" "}
            <a target="_blank" href="/termsandconditions">
              terms and conditions
            </a>
          </label>
          <input
            type="checkbox"
            ref={AgreedTCRef}
            id="AgreeTermsAndConditions"
            style={{ marginLeft: "30px" }}
          />
          <span ref={tACError} className="error"></span>
        </div>
        <div>
          <button type="submit" onClick={signUpSubmit} id="SignUp">
            Sign Up
          </button>
        </div>
        {blipVisiblity && <Bliptext text={responseData} />}
      </div>

      <div className="SignInOptions">
        <h1>Bus Sewa </h1>
        <p>Connecting people around nepal</p>
        <h3>Already have an Account?</h3>
        <p>Login to get set travelling by clicking button below.</p>
        <Link to="/login">
          <button id="signinBtn">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
