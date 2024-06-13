import { useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Validation from "../Services/Validation";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import LocalStorage from "../Services/LocalStorage.js";
import axios from "axios";
import ApiServices from "../Services/Api.js";
function Otp() {
  const [otp, setOtp] = useState("");
  const [phoneNum, setphoneNum] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [successMsg, setSuccessMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const Mq = {
    sm: useMediaQuery("(max-width:768px)"),
    lg: useMediaQuery("(min-width:1001px)"),
  };
  const navigate = useNavigate();

  useEffect(() => {
    let data = LocalStorage.getMobileNumber();
    setphoneNum(data);
  }, []);
  function verification() {
    let result = Validation.verifyOtp(otp);
    if (result.valid == false) {
      setErrorMsg(result.message);
      setOpenSnackbar(true);
    } else {
      otpApiCall();
    }
  }

  function otpApiCall() {
    const transactionId = searchParams.get("transactionId");
    let data = {
      otp: otp,
      transactionId: transactionId,
    };
    let token = LocalStorage.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      },
    };
    axios
      .post(ApiServices.VRF_OTP, data, config)
      .then((response) => {
        if (response.status == 200) {
          let data = response.data.PayLoad["message"];
          setErrorMsg(data);
          setOpenSnackbar(true);
        } else {
          setErrorMsg("Something Went Wrong");
          setOpenSnackbar(true);
        }
      })

      .catch((error) => {
        handleApiError(error.response);
      });
  }

  function logOut() {
    navigate("/");
    LocalStorage.removeToken();
  }

  async function handleApiError(response) {
    if (response.status == 500) {
      let errdata = response.data.Errors[0].Code;
      if (errdata == 403) {
        setErrorMsg("Token Expired Navigating to Login Page");
        setOpenSnackbar(true);
        await delay(2000);
        navigate("/");
      } else if (errdata == 417) {
        setErrorMsg("Invalid OTP");
        setOpenSnackbar(true);
      } else {
        setErrorMsg("Something Went Wrong");
        setOpenSnackbar(true);
      }
    } else {
      setErrorMsg("Something Went Wrong");
      setOpenSnackbar(true);
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
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        className="navBar"
        style={{
          width: "100vw",
          height: "8vh",

          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "#1976D2",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          sx={{ marginTop: "0vh", marginRight: "3vw",color:"black" }}
          onClick={(e) => {
            logOut(e.target.value);
          }}
        >
          Logout
        </Button>
      </div>

      <div
        className="Container"
        style={{
          // background:"black",
          // border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          borderRadius: "20px",
          height: "70vh",
          width: Mq.sm ? "80vw" : "50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div
          className="Verification"
          style={{
            color: "black",
            display: "flex",
            width: Mq.sm ? "72vw" : "",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "100vw" : "50vw",
              color: "red",
            }}
          >
            Mobile Phone Verification
          </h2>
          <br />
          <p
            style={{
              fontWeight: "500",
              fontSize: "15px",
              textAlign: "justify",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60vw",
              flexDirection: "column",
            }}
          >
            <p>
              Enter the code we just sent on your Mobile{" "}
              <span style={{ color: "red" }}>+91{phoneNum}</span>
            </p>{" "}
          </p>
        </div>
        <div className="OTPBox" style={{ margin: "0vh" }}>
          <OtpInput
            inputStyle={{
              height: "30px",
              width: "40px",
              background: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <div
          className="Resend"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            // paddingBottom: "30px",
          }}
        >
          <h4 style={{ color: "black" }}>Don't receive the code ?</h4>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "100vw" : "30vw",
            }}
          >
            <Button
              style={{ marginRight: "30px" }}
              variant="contained"
              onClick={() => {
                verification();
              }}
            >
              Verify OTP
            </Button>
            <Button variant="contained">Resend</Button>
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

export default Otp;
