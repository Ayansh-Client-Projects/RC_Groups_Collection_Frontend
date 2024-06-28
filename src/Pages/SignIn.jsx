import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiServices from "../Services/Api.js";
import StoreApi from "../Services/LocalStorage.js";
import Validation from "../Services/Validation";
import colors from "../Utility/colors.js";
import SigninLogo from "../assets/bg.png";
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
      signInUserApiCall();
    }
  }

  function signInUserApiCall() {
    axios
      .post(ApiServices.LOGIN_URL, {
        mobileNumber: phoneNum,
        password: password,
      })
      .then((response) => {
        if (response.status == 200) {
          let data = response.data["PayLoad"];
          StoreApi.setUserData(data);
          localStorage.setItem("userPhoneNum", phoneNum);
          navigate("/home");
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
        background: colors.secondaryBackground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: Mq.sm ? "column" : "row",
      }}
    >
      {/* <img
        src={SigninLogo}
        // style={{ height: Mq.sm?"50%":"60%", width: Mq.sm ? "70%" : "40%" }}
        style={{ height: Mq.sm?"50%":"90%", width: Mq.sm ? "70%" : "26%",borderRadius:"12px" }}
      /> */}
      <div
        style={{
          height: Mq.sm ? "100%" : "90%",
          width: Mq.sm ? "100%" : "26%",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage:`url(${SigninLogo})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="Container"
          style={{
            height: "40vh",
            width: "50vw",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            {/* <p
              style={{
                color:"black",
                fontWeight: "400",
                marginBottom: "15px",
              }}
            >
              * User Mobile Number
            </p> */}
            <TextField
              id="outlined-basic"
              label="Mobile Number "
              placeholder="Enter your mobile number"
              variant="standard"
              InputLabelProps={{
                style: { color: colors.primary },
              }}
              
              sx={{
                width: Mq.sm ? "70vw" : "20vw",
                // background: colors.signin,
                
              }}
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
          </div>
          <div>
            {/* <p
              style={{
                color:"black",
                fontWeight: "400",
                marginBottom: "15px",
              }}
            >
              * Password
            </p> */}
            <TextField
             variant="standard"
              id="password"
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              placeholder="Enter your password"
              label="Password"
              style={{
                width: Mq.sm ? "70vw" : "20vw",
                // background: colors.signin,
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </div>

          <Button
            variant="contained"
            style={{
              width: Mq.sm ? "70vw" : "20vw",
              background: colors.primary,
            }}
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
