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
      }}
    >
      <div
        className="Container"
        style={{
          // background:"black",
          border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          borderRadius: "20px",
          height: "50vh",
          width: Mq.sm ? "80vw" : "50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
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
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "80vw" : "50vw",
            }}
          >
            Mobile Phone Verification
          </h3>
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
        <div className="OTPBox">
          <OtpInput
            inputStyle={{
              height: "40px",
              width: "40px",
              background: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            paddingBottom: "30px",
          }}
        >
          <h4 style={{ color: "black" }}>Don't receive the code ?</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "100vw" : "30vw",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
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
