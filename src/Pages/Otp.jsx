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
import colors from "../Utility/colors.js";
import { IoMdArrowRoundBack } from "react-icons/io";
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
        "Content-Type": "application/json",
      },
    };
    axios
      .post(ApiServices.VRF_OTP, data, config)
      .then((response) => {
        if (response.status == 200) {
          let data = response.data.PayLoad["message"];
          setErrorMsg(data);
          setOpenSnackbar(true);
          navigate("/home/paymenthistory");
        } else {
          setErrorMsg("Something Went Wrong");
          setOpenSnackbar(true);
        }
      })

      .catch((error) => {
        handleApiError(error.response);
      });
  }

  function back() {
    navigate("/home");
    // LocalStorage.removeToken();
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

  const [timeLeft, setTimeLeft] = useState(120);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsButtonDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendOtp = () => {
    // Logic for resending OTP
    const transactionId = searchParams.get("transactionId");
    let data = {
      smsTxnId: transactionId,
    };
    let token = LocalStorage.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(ApiServices.RESEND_OTP, data, config)
      .then((response) => {
        if (response.status == 200) {
          let data = response.data.PayLoad["message"];
          setErrorMsg(data);
          setOpenSnackbar(true);
          navigate("/home/paymenthistory");
        } else {
          setErrorMsg("Something Went Wrong");
          setOpenSnackbar(true);
        }
      })

      .catch((error) => {
        handleApiError(error.response);
      });
  };

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
        background: colors.background,
      }}
    >
      <div
        className="navBar"
        style={{
          width: "100vw",
          height: "8vh",
          marginTop: "0vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: colors.primary,
        }}
      >
        <IoMdArrowRoundBack
          style={{ height: "25px", width: "30px", marginLeft: "10px" }}
          onClick={(e) => {
            back(e.target.value);
          }}
        />
      </div>

      <div
        className="Container"
        style={{
          // background:"black",
          // border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          // boxShadow: "rgba(0, 0, 0, 2) 0px 2px 5px",
          background: colors.secondaryBackground,
          marginTop: "10vh",
          borderRadius: "10px",
          height: Mq.sm ? "60vh" : "50vh",
          width: Mq.sm ? "90vw" : "55vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // justifyContent: "center",
        }}
      >
        <div
          className="Verification"
          style={{
            color: "black",
            display: "flex",
            width: Mq.sm ? "90vw" : "55vw",
            // marginTop: "5px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: colors.primary,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h2
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "80vw" : "55vw",
              textAlign: "center",

              marginTop: "10px",
              color: "white",
              fontWeight: "800",
              fontSize: "18px",
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
              width: Mq.sm ? "90vw" : "55vw",
              flexDirection: "column",
              // color: "white",
              color: "black",
              background: colors.secondaryBackground,
            }}
          >
            <p style={{ margin: "15px" }}>
              Enter the code we just sent on your Mobile{" "}
              <span style={{ color: "black" }}>+91{phoneNum}</span>. The code is
              only valid for 10 mins.
            </p>{" "}
          </p>
        </div>
        <div
          className="OTPBox"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50vw",
            marginTop: "2vh",
            flexDirection: Mq.sm ? "column" : "row",
            // paddingBottom: "30px",
            // background: "black",
          }}
        >
          <OtpInput
            inputStyle={{
              height: "30px",
              width: "40px",
              background: "gray",
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              color: "black",
              justifyContent: "space-around",
            }}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
          <Button
            style={{
              marginTop: Mq.sm ? "5vh" : "0vh",
              width: "130px",
              marginLeft: Mq.sm ? "0px" : "50px",
              color: "white",
              background: colors.primary,
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              verification();
            }}
          >
            Verify OTP
          </Button>
        </div>
        <div
          className="Resend"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "5vh",
            // paddingBottom: "30px",
            // background: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: Mq.sm ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              width: Mq.sm ? "100vw" : "50vw",
              // height:Mq.sm? "10vh":"50vh"
            }}
          >
            <h4 style={{ color: "black", marginRight: Mq.sm ? "0px" : "40px" }}>
              Don't receive the code ?
            </h4>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendOtp}
              disabled={isButtonDisabled}
              sx={{
                width: "130px",
                marginTop: Mq.sm ? "3vh" : "0vh",
                color: "white",
                boxShadow: "rgba(0, 0, 0, 2) 0px 0px 3.5px",
                background: colors.primary,
              }}
            >
              {isButtonDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
            </Button>
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
