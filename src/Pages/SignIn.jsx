import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SigninLogo from "../assets/Signinlogo.svg";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Validation from "../Services/Validation";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import ApiServices from "../Services/Api.js";
import StoreApi from "../Services/LocalStorage.js";
function SignIn() {
  const Mq = {
    sm: useMediaQuery("(max-width:600px)"),
    lg: useMediaQuery("(min-width:1001px)"),
  };
  const navigate = useNavigate();
  // function navigateToSignUp() {
  //   navigate("/signup");
  // }

  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function signInUser() {
    let result = Validation.signInValidation(phoneNum, password);
    if (result.valid == false) {
      setErrorMsg(result.message);
      setOpenSnackbar(true);
    } else {
      // navigate("/otp");
      signInUserApiCall();
    }
  }

  function signInUserApiCall() {
    axios
      .post( ApiServices.LOGIN_URL,{
        mobileNumber: phoneNum,
        password: password,
      })
      .then((response) => {
        if (response.status == 200) {
          let data = response.data["PayLoad"];
          StoreApi.setUserData(data);
          navigate("/form");
        } else {
          setErrorMsg("Something Went Wrong");
          setOpenSnackbar(true);
        }
      })

      .catch((error) => {
        setErrorMsg("Something Went Wrong");
        setOpenSnackbar(true);
      });
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
      <img
        src={SigninLogo}
        style={{ height: "50%", width: Mq.sm ? "70%" : "50%" }}
      />
      <div
        className="Container"
        style={{
          // background:"black",
          height: "40vh",
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
            signInUser();
          }}
        >
          Sign in
        </Button>
        <div
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <p style={{ color: "black" }}>
            Don't have an account ?{" "}
            <span
              style={{ color: "blue", fontWeight: "600" }}
              onClick={() => {
                navigateToSignUp();
              }}
            >
              Signup
            </span>
          </p> */}
        </div>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: Mq.sm ? "top" : "bottom",
          horizontal: Mq.sm ? "center" : "right",
        }}
        autoHideDuration={2000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        open={openSnackbar}
        message={errorMsg}
      />
    </div>
  );
}

export default SignIn;
