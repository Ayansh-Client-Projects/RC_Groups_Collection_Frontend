import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SigninLogo from "../assets/Signinlogo.svg";
import { useMediaQuery } from "@mui/material";
import Validation from "../Services/Validation";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';

function SignUp() {
  const Mq = {
    sm: useMediaQuery("(max-width:600px)"),
    lg: useMediaQuery("(min-width:1001px)"),
  };
  const [username, setUsername] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  function signUpUser() {
    let result = Validation.signUpValidation(username, phoneNum, password);
    if (result.valid == false) {
      setErrorMsg (result.message) ;
      setOpenSnackbar(true)

    } else {
      navigate("/otp");
    }
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: Mq.sm ? "column" : "row",
      }}
    >
      <img src={SigninLogo} style={{ height: "50%", width: "50%" }} />
      <div
        className="Container"
        style={{
          // background:"black",
          height: "50vh",
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
          placeholder="Enter your Name"
          variant="outlined"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <TextField
          id="outlined-basic"
          label="Contact"
          placeholder="Enter your mobile number"
          variant="outlined"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
        />
        <TextField
          id="password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>

        <Button
          variant="contained"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onClick={() => {
            signUpUser();
          }}
        >
          Sign Up
        </Button>
      </div>
      <Snackbar
      anchorOrigin= {
        {
          "vertical":"top",
          "horizontal":"center"
        }
      }
      autoHideDuration = {2000}
      onClose={()=>{
        setOpenSnackbar(false)
      }}
        open={openSnackbar}
        message= {errorMsg}
      />
    </div>
  );
}

export default SignUp;
