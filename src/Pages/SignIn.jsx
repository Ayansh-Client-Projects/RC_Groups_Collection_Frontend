import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SigninLogo from "../assets/Signinlogo.svg";
import { useMediaQuery } from "@mui/material";
function SignIn() {
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
        flexDirection:Mq.sm ? "column" :"row" ,
        
      }}
    >
      <img src={SigninLogo} style={{ height: "50%", width: "50%" }} />
      <div
        className="Container"
        style={{
          // background:"black",
          height: "30vh",
          width: "50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <TextField
          id="outlined-basic"
          label="User"
          placeholder="Enter your mobile number"
          variant="outlined"
          style= {{ width: Mq.sm ? "70vw" :"30vw" }}
        />
        <TextField
          id="password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          style= {{ width: Mq.sm ? "70vw" :"30vw" }}
        ></TextField>

        <Button variant="contained"  style= {{ width: Mq.sm ? "70vw" :"30vw" }}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
