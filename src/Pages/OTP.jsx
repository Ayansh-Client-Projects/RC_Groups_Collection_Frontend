
import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

function Otp() {
  const [otp, setOtp] = useState("");
  const [num, setNum] = useState();

  const Mq = {
    sm: useMediaQuery("(max-width:600px)"),
    lg: useMediaQuery("(min-width:1001px)"),
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="Container"
        style={{
          // background:"black",
          border: Mq.sm ? "0px":"2px solid #D8D8D8",
          borderRadius: "20px",
          height: "50vh",
          width: Mq.sm ?"80vw":"50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div className="Verification" style={{color:"black", display: "flex",width:Mq.sm? "72vw":"",
          alignItems:Mq.sm? "start":"center",justifyContent:"center",flexDirection:"column"}} >
          <h3>Mobile Phone Verification</h3>
          <h5 style={{}}>Enter the code we just sent on your mobile phone {num} </h5>
        </div>
        <div className="OTPBox">
          <OtpInput
          inputStyle = {{height:"40px",width:"40px", background:"gray"}}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div className="Resend" style={{  display: "flex",
          alignItems: "center",justifyContent:"center",flexDirection:"column",paddingBottom:"30px"}}>
          <h3 style={{ color: "black" }}>Don't receive the code ?</h3>
          <Button variant="contained" style={{ width: Mq.sm ? "70vw" : "10vw" }}>
            Resend
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Otp;
