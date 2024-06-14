import React, { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BsCalendar2Date } from "react-icons/bs";
import Validation from "../Services/Validation";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../Services/LocalStorage.js";
import ApiServices from "../Services/Api.js";

function UserData() {
  const [retailer, setRetailer] = React.useState("");
  const [retailers, setRetailers] = React.useState([]);
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

  useEffect(() => {
    let token = LocalStorage.getToken();
    axios
      .get(ApiServices.ADD_DEALER_TO_SALESAMN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let allDealers = response.data.PayLoad.dealers;
        setRetailers(allDealers);
      })
      .catch((error) => {
        handleApiError(error.response);
      });
  }, []);

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
        "Access-Control-Allow-Origin": "*",
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
        backgroundColor: "#1976D2",
      }}
    >
      <div
        className="navBar"
        style={{
          width: "100vw",
          height: Mq.sm? "3vh":"8vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
         
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          sx={{ marginTop:Mq.sm? "25px": "0vh", marginRight: "3vw",color:"black",height:Mq.sm ?"5.5vh":"6vh" }}
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
            background:"white",
          border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          borderRadius: "20px",
          height: Mq.sm ? "90vh" : "70vh",
          paddingTop: "5vh",
          marginTop:"5vh",
          paddingBottom: "5vh",
          width: Mq.sm ? "90vw" : "60vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          marginBottom:"3vh"
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Retailer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={retailer}
                style={{
                  width: Mq.sm ? "80vw" : "20vw",
                  marginRight: Mq.sm ? "0" : "5vw",
                  marginBottom: Mq.sm ? "2vh" : "",
                  height:Mq.sm ? "7.5vh":"",
         
                }}
                label="Name"
                onChange={handleChange}
              >
                {retailers.map((value) => (
                  <MenuItem value={value.dealerId}>{value.dealerName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div className="InvDate" style={{ marginTop: Mq.sm ? "0" : "0vh" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem label="">
                  <DatePicker
                    sx={{ width: Mq.sm ? "80vw" : "20vw",}}
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
            width: Mq.sm ? "80vw" : "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Invoice"
            placeholder="ex:INV-1234"
            variant="outlined"
            style={{ width: Mq.sm ? "70vw" : "20vw", marginRight: "5vw" }}
            onChange={(e) => {
              setinvoiceNumber(e.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Amount"
            placeholder="Enter Total Amount"
            variant="outlined"
            style={{ width: Mq.sm ? "70vw" : "20vw" }}
            onChange={(e) => {
              setamount(e.target.value);
            }}
          />
        </div>

        <div
          className="Row3"
          style={{
            display: "flex",
            width: Mq.sm ? "80vw" : "100vw",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: Mq.sm ? "column" : "row",
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Payment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                style={{
                  width: Mq.sm ? "80vw" : "20vw",
                  marginRight: Mq.sm ? "0" : "5vw",
                  height:Mq.sm ? "7.5vh":"",
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
            <TextField
              id="outlined-basic"
              label="UPI Address"
              placeholder="ex:T240531*********5536"
              variant="outlined"
              style={{
                width: Mq.sm ? "80vw" : "20vw",
                marginTop: Mq.sm ? "5vh" : "0",
                height:Mq.sm ? "7.5vh":"",
              }}
              onChange={(e) => {
                setUpiId(e.target.value);
              }}
            />
          ) : payment.toLowerCase() == "cheque" ? (
            <TextField
              id="outlined-basic"
              label="Cheque No"
              placeholder="Enter Cheque Number"
              variant="outlined"
              style={{
                width: Mq.sm ? "80vw" : "20vw",
                marginTop: Mq.sm ? "2vh" : "0",
                
              }}
              onChange={(e) => {
                setcheqno(e.target.value);
              }}
            />
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
              flexDirection: Mq.sm ? "column" : "row",
           
            }}
          >
            <TextField
              id="outlined-basic"
              label="Bank"
              placeholder="Enter Bank Name"
              variant="outlined"
             
              style={{
                width: Mq.sm ? "80vw" : "20vw",
                marginTop: Mq.sm ? "0vh" : "0",
                marginRight: Mq.sm ? "0" : "5vw",
              }}
              onChange={(e) => {
                setBank(e.target.value);
              }}
            />

            <div className="CheqDate" style={{ marginTop: "0vh" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem label="">
                    <DatePicker
                      sx={{
                        width: Mq.sm ? "80vw" : "20vw",
                        marginTop: Mq.sm ? "0vh" : "0",
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
        <Button
          variant="contained"
          style={{ width: Mq.sm ? "40vw" : "20vw", }}
          onClick={() => {
            userDataValidation();
          }}
        >
          Send OTP
        </Button>
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

export default UserData;
