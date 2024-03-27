import React, { useRef, useState } from "react";
import ccBgimg from "../../../assets/images/5138237.jpg";
export default function CustomerCare() {
  const clipboardtext = useRef(null);
  const [copiedPopNotify, setCopiedPopNotify] = useState(false);
  const copyClipboard = () => {
    navigator.clipboard
      .writeText(clipboardtext.current.textContent)
      .then(() => {
        setCopiedPopNotify(true);
        setTimeout(() => {
          setCopiedPopNotify(false);
        }, 1500);
      });
  };
  return (
    <div className="d-flx" id="CustomerCareContainer">
      <div id="CustomerCareImageDiv">
        <img id="CustomerCareImage" src={`${ccBgimg}`} alt="" />
      </div>
      <div className="" id="customerCareInfo">
        <h1>Hey Buddy</h1>
        <p>
          Any problems related to our services ?<br />
          We are here to help you all day long. The telephone number below is
          all you need to click/tap to copy our customer care number. It is free
          of cost for the customer help and care serices. Have a wonderful
          journey.
        </p>
        <button onClick={copyClipboard} ref={clipboardtext} id="ccNmberBtn">
          9816989414
        </button>
        {copiedPopNotify && (
          <p
            style={{
              background: "#555555",
              width: "fit-content",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              boxShadow: "0 0 5px 1px #fff",
            }}
          >
            copied
          </p>
        )}
      </div>
    </div>
  );
}
