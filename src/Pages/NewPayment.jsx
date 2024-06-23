import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import React, { useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ApiServices from "../Services/Api.js";
import LocalStorage from "../Services/LocalStorage.js";
import Validation from "../Services/Validation";
import colors from "../Utility/colors.js";
function NewPayment(props) {
  const [retailer, setRetailer] = React.useState("");
  const [payment, setPayment] = React.useState("");
  const [invoiceNumber, setinvoiceNumber] = useState("");
  const [amount, setamount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [upiid, setUpiId] = useState("");
  const [chequenum, setcheqno] = useState("");
  const [bankname, setBank] = useState("");
  const [cheqdate, setCheqDate] = useState("");
  const [invdate, setInvDate] = useState("");

 let retailers = props.retailers

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const Mq = {
    sm: useMediaQuery("(max-width:768px)"),
    lg: useMediaQuery("(min-width:770px)"),
  };

  const handleChange = (event) => {
    setRetailer(event.target.value);
  };
  const paymentMode = (event) => {
    setPayment(event.target.value);
  };

  const navigate = useNavigate();

  function userDataValidation() {
    let result = Validation.validateForm(
      invoiceNumber,
      amount,
      payment,
      invdate,
      cheqdate,
      bankname,
      chequenum,
      upiid,
      retailer
    );
    if (result.valid == false) {
      setErrorMsg(result.message);
      setOpenSnackbar(true);
    } else {
      sendMessageApiCall();
    }
  }
  function getFinalUserData() {
    let data = {
      invoice: invoiceNumber,
      invoiceDate: invdate,
      mode: payment,
      amount: amount,
      dealerId: retailer,
      additionalPaymentDetails: null,
    };

    if (payment.toLowerCase() == "cheque") {
      data.additionalPaymentDetails = {
        chequeNumber: chequenum,
        chequeDate: cheqdate,
        bankName: bankname,
      };
    }
    if (payment.toLowerCase() == "online") {
      data.additionalPaymentDetails = {
        UpiAddress: upiid,
      };
    }
    return data;
  }
  function sendMessageApiCall() {
    let data = getFinalUserData();
    console.log(data);
    let token = LocalStorage.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(ApiServices.SEND_MSG, data, config)
      .then(async (response) => {
        if (response.status == 200) {
          let transactionId = response.data.PayLoad.transactionId;
          navigate(`/otp?transactionId=${transactionId}`);
        } else {
          setErrorMsg("Something Went Wrong");
          setOpenSnackbar(true);
        }
      })

      .catch((error) => {
        handleApiError(error.response);
      });
  }

  // function logOut() {
  //   navigate("/");
  //   LocalStorage.removeToken();
  // }

  async function handleApiError(response) {
    if (response.status == 500) {
      let errdata = response.data.Errors[0].Code;
      if (errdata == 403) {
        setErrorMsg("Token Expired Navigating to Login Page");
        setOpenSnackbar(true);
        await delay(3000);
        navigate("/");
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
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        background: colors.background,
        overflowY: "auto",
      }}
    >
      <div
        className="Container"
        style={{
          borderRadius: "10px",
          height: Mq.sm ? "85vh" : "70vh",
          marginTop: Mq.sm ? "3vh" : "5vh",
          width: Mq.sm ? "90vw" : "60vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          // paddingBottom: "5vh",
          // paddingTop: "5vh",
          // background:colors.background,
          // background:"white",
          // border: Mq.sm ? "0px" : "2px solid white",
          // boxShadow: "rgba(0, 0, 0, 2) 0px 0px 3px",
          // boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 5px", 
          // justifyContent: "center",
        }}
      >
        <div
          className="Row1"
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "100vw",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: Mq.sm ? "column" : "row",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "10px",
              }}
            >
              * Retailer Name
            </p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Retailer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={retailer}
                style={{
                  width: Mq.sm ? "80vw" : "30vw",
                  marginRight: Mq.sm ? "0" : "5vw",
                  marginBottom: Mq.sm ? "2vh" : "",
                  background: colors.secondaryBackground,
                  //  textAnchor:"start"
                }}
                label="Choose Retailer"
                onChange={handleChange}
              >
                {retailers.map((value) => (
                  <MenuItem value={value.dealerId}>{value.dealerName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div
            className="InvDate"
            style={{ marginBottom: Mq.sm ? "2vh" : "0vh" }}
          >
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "5 px",
              }}
            >
              * Invoice Date
            </p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem label="">
                  <DatePicker
                    sx={{
                      width: Mq.sm ? "80vw" : "30vw",
                      background: colors.secondaryBackground,
                    }}
                    components={{ openPickerIcon: BsCalendar2Date }}
                    onChange={(e) => {
                      setInvDate(e.format("YYYY-MM-DD"));
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div
          className="Row2"
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "60vw",
            justifyContent: "center",
            alignItems: "center",
            // marginTop: "0vh",
            marginBottom: Mq.sm ? "2vh" : "5vh",
            marginTop: Mq.sm ? "0vh" : "5vh",
            flexDirection: Mq.sm ? "column" : "row",
          }}
        >
          <div>
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "15px",
              }}
            >
              * Invoice Number
            </p>
            <TextField
              id="outlined-basic"
              label="Invoice"
              placeholder="ex:INV-1234"
              // variant="filled"
              style={{
                // background:"#F0F0F3",
                background: colors.secondaryBackground,
                // borderRadius:"15px",
                border: "none",
                marginTop: "0vh",
                marginRight: Mq.sm ? "0vw" : "5vw",
                width: Mq.sm ? "80vw" : "30vw",

              }}
              onChange={(e) => {
                setinvoiceNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "15px",
                marginTop: Mq.sm ? "15px" : "0px",
              }}
            >
              * Total Amount
            </p>

            <TextField
              id="outlined-basic"
              label="Amount"
              placeholder="Enter Total Amount"
              variant="outlined"
              style={{
                // marginRight: Mq.sm?"0vw":"5vw",
                width: Mq.sm ? "80vw" : "30vw",
                background: colors.secondaryBackground,
              }}
              onChange={(e) => {
                setamount(e.target.value);
              }}
            />
          </div>
        </div>

        <div
          className="Row3"
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "65vw",
            // // justifyContent: "center",
            // alignItems: "center",
            // background:"black",
            
            flexDirection: Mq.sm ? "column" : "row",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <p
              style={{
                color: "black",
                fontWeight: "400",
                marginBottom: "15px",
              }}
            >
              * Payment Mode
            </p>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Payment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                style={{
                  width: Mq.sm ? "80vw" : "30vw",
                  background: colors.secondaryBackground,
                  
                }}
                label="Name"
                onChange={paymentMode}
              >
                <MenuItem value={"cash"}>CASH</MenuItem>
                <MenuItem value={"online"}>ONLINE</MenuItem>
                <MenuItem value={"cheque"}>CHEQUE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {payment.toLowerCase() == "online" ? (
            <div style={{ marginLeft: Mq.sm ? "0vw" : "5vw"}}>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  marginBottom: Mq.sm ? "5px" : "15px",
                  width: Mq.sm ? "80vw" : "30vw",
                  marginTop: Mq.sm ? "15px" : "0px",
                }}
              >
                * UPI Address
              </p>

              <TextField
                id="outlined-basic"
                label="UPI Address"
                // placeholder=""
                variant="outlined"
                style={{
                width: Mq.sm ? "80vw" : "30vw",
                  marginTop: Mq.sm ? "2vh" : "0",
                  marginBottom: Mq.sm ? "2vh" : "0vh",
                  // marginLeft: Mq.sm ? "0vw" : "5vw ,
                  background: colors.secondaryBackground,
                }}
                onChange={(e) => {
                  setUpiId(e.target.value);
                }}
              />
            </div>
          ) : payment.toLowerCase() == "cheque" ? (
            <div>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  marginBottom: Mq.sm ? "0px" : "15px",
                  marginTop: Mq.sm ? "15px" : "0px",
                  width: Mq.sm ? "80vw" : "20vw",
                  marginLeft: Mq.sm ? "0vw" : "5vw",
                }}
              >
                * Cheque Number
              </p>

              <TextField
                id="outlined-basic"
                label="Cheque Number"
                placeholder="Enter Cheque Number"
                variant="outlined"
                style={{
                  width: Mq.sm ? "80vw" : "30vw",
                  marginTop: Mq.sm ? "2vh" : "0",
                  marginLeft: Mq.sm ? "0vw" : "5vw",
                  background: colors.secondaryBackground,
                }}
                onChange={(e) => {
                  setcheqno(e.target.value);
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>

        {payment.toLowerCase() == "cheque" ? (
          <div
            className="Row4"
            style={{
              display: "flex",
              width: Mq.sm ? "80vw" : "100vw",
              justifyContent: "center",
              alignItems: "center",
              marginTop: Mq.sm ? "1.8vh" : "5vh",
              flexDirection: Mq.sm ? "column" : "row",
            }}
          >
            <div>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  marginBottom: "15px",
                  // marginTop: Mq.sm ? "15px":"0px",
                  width: Mq.sm ? "80vw" : "30vw",
                }}
              >
                * Bank Name
              </p>
              <TextField
                id="outlined-basic"
                label="Bank"
                placeholder="Enter Bank Name"
                variant="outlined"
                style={{
                  width: Mq.sm ? "80vw" : "30vw",
                  marginTop: Mq.sm ? "0vh" : "0",
                  marginRight: Mq.sm ? "0" : "5vw",
                  background: colors.secondaryBackground,
                }}
                onChange={(e) => {
                  setBank(e.target.value);
                }}
              />
            </div>
            <div className="CheqDate" style={{ marginTop: "0vh" }}>
              <p
                style={{
                  color: "black",
                  fontWeight: "400",
                  // marginBottom: "15px",
                  marginBottom: Mq.sm ? "5px" : "5px",
                  marginTop: Mq.sm ? "15px" : "0px",
                  // marginLeft: Mq.sm ? "0vw" : "5vw",
                }}
              >
                * Cheque Isuued
              </p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem label="">
                    <DatePicker
                      sx={{
                        width: Mq.sm ? "80vw" : "30vw",
                        marginTop: Mq.sm ? "0vh" : "0",
                        background: colors.secondaryBackground,
                      }}
                      format="DD-MM-YYYY"
                      onChange={(e) => {
                        setCheqDate(e.format("YYYY-MM-DD"));
                      }}
                      components={{ openPickerIcon: BsCalendar2Date }}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div
          className="buttonRow"
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "65vw",
            paddingBottom: "5vh",
            paddingTop: "3vh",
          }}
        >
          <Button
            variant="contained"
            color="info"
            style={{
              width: Mq.sm ? "40vw" : "20vw",
              marginTop: Mq.sm ? "2vh" : "5vh",
              boxShadow: "rgba(0, 0, 0, 2) 0px 0px 3.5px",
              background: colors.primary,
            }}
            onClick={() => {
              userDataValidation();
            }}
          >
            Send OTP
          </Button>
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

export default NewPayment;
