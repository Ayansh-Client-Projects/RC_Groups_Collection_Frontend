import React from "react";
import { useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BsCalendar2Date } from "react-icons/bs";
import Validation from "../Services/Validation";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

function UserData() {
  const Mq = {
    sm: useMediaQuery("(max-width:600px)"),
    lg: useMediaQuery("(min-width:768px)"),
  };

  const [retailer, setRetailer] = React.useState("");

  const handleChange = (event) => {
    setRetailer(event.target.value);
  };
  const [payment, setPayment] = React.useState("");
  const paymentMode = (event) => {
    setPayment(event.target.value);
  };

  const [invoiceNumber, setinvoiceNumber] = useState("");
  const [amount, setamount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  function userDataValidation() {
    let result = Validation.validateForm(invoiceNumber, amount);
    if (result.valid == false) {
      setErrorMsg(result.message);
      setOpenSnackbar(true);
    } else {
      navigate("/otp");
      // navigate("/form");
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
      }}
    >
      <div
        className="Container"
        style={{
          //   background:"black",
          border: Mq.sm ? "0px" : "2px solid #D8D8D8",
          borderRadius: "20px",
          height: "65vh",
          paddingTop: "5vh",
          paddingBottom: "5vh",
          width: Mq.sm ? "80vw" : "50vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Retailer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={retailer}
              style={{ width: Mq.sm ? "70vw" : "30vw" }}
              label="Name"
              onChange={handleChange}
            >
              <MenuItem value={10}>XYZ</MenuItem>
              <MenuItem value={20}>PQR</MenuItem>
              <MenuItem value={30}>ABC</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="outlined-basic"
          label="Invoice"
          placeholder="Enter Invoice"
          variant="outlined"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onChange={(e) => {
            setinvoiceNumber(e.target.value);
          }}
        />
        <div className="Calender" style={{ marginTop: "-5vh" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="Responsive variant">
                <DatePicker
                  // openPickerIcon = {<BsCalendar2Date style={{color:"black",height:"10px",width:"10px"}}/>}
                  defaultValue={dayjs("2022-04-17")}
                  sx={{ width: Mq.sm ? "70vw" : "30vw" }}
                  components={{ openPickerIcon: BsCalendar2Date }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Payment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payment}
              style={{ width: Mq.sm ? "70vw" : "30vw" }}
              label="Name"
              onChange={paymentMode}
            >
              <MenuItem value={"CASH"}>CASH</MenuItem>
              <MenuItem value={"UPI"}>UPI</MenuItem>
              <MenuItem value={"NEFT"}>NEFT</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          id="outlined-basic"
          label="Amount"
          placeholder="Enter Total Amount"
          variant="outlined"
          style={{ width: Mq.sm ? "70vw" : "30vw" }}
          onChange={(e) => {
            setamount(e.target.value);
          }}
        />
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
