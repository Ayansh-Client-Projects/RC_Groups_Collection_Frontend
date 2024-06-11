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
    let data = LocalStorage.getDealers();
    setRetailers(data);
  }, []);

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
      // navigate("/otp");
      // navigate("/form");
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
    if (payment.toLowerCase() == "upi") {
      data.additionalPaymentDetails = {
        UpiAddress: upiid,
      };
    }
    return data;
  }
  function sendMessageApiCall() {
    let data = getFinalUserData();
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
      .post(ApiServices.SEND_MSG, data, config)
      .then((response) => {
        if (response.status == 200) {
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
          //   background:"black",
          // border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          borderRadius: "20px",
          height: Mq.sm ? "90vh" : "70vh",
          paddingTop: "5vh",
          paddingBottom: "5vh",
          width: Mq.sm ? "80vw" : "50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
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
                  width: Mq.sm ? "80vw" : "40vw",
                  marginRight: Mq.sm ? "0" : "5vw",
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

          <div className="InvDate" style={{ marginTop: Mq.sm ? "0" : "-5vh" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DemoItem label="Responsive variant">
                  <DatePicker
                    sx={{ width: Mq.sm ? "80vw" : "40vw" }}
                    components={{ openPickerIcon: BsCalendar2Date }}
                    onChange={(e) => {
                      setInvDate(e.format("DD-MM-YYYY"));
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
            style={{ width: Mq.sm ? "70vw" : "40vw", marginRight: "5vw" }}
            onChange={(e) => {
              setinvoiceNumber(e.target.value);
            }}
          />

          <TextField
            id="outlined-basic"
            label="Amount"
            placeholder="Enter Total Amount"
            variant="outlined"
            style={{ width: Mq.sm ? "70vw" : "40vw" }}
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
                  width: Mq.sm ? "80vw" : "40vw",
                  marginRight: Mq.sm ? "0" : "5vw",
                }}
                label="Name"
                onChange={paymentMode}
              >
                <MenuItem value={"CASH"}>CASH</MenuItem>
                <MenuItem value={"UPI"}>UPI</MenuItem>
                <MenuItem value={"CHEQUE"}>CHEQUE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {payment.toLowerCase() == "upi" ? (
            <TextField
              id="outlined-basic"
              label="UPI ID"
              placeholder="ex:T240531*********5536"
              variant="outlined"
              style={{
                width: Mq.sm ? "80vw" : "40vw",
                marginTop: Mq.sm ? "5vh" : "0",
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
                width: Mq.sm ? "80vw" : "40vw",
                marginTop: Mq.sm ? "5vh" : "0",
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
                width: Mq.sm ? "80vw" : "40vw",
                marginTop: Mq.sm ? "0vh" : "0",
                marginRight: Mq.sm ? "0" : "5vw",
              }}
              onChange={(e) => {
                setBank(e.target.value);
              }}
            />

            <div className="CheqDate" style={{ marginTop: "-5vh" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem label="Responsive variant">
                    <DatePicker
                      sx={{
                        width: Mq.sm ? "80vw" : "40vw",
                        marginTop: Mq.sm ? "0vh" : "0",
                      }}
                      format="DD-MM-YYYY"
                      onChange={(e) => {
                        setCheqDate(e.format("DD-MM-YYYY"));
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
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
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
