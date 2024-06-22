import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import colors from "../Utility/colors.js";
function Filter() {
  const Mq = {
    sm: useMediaQuery("(max-width:768px)"),
    lg: useMediaQuery("(min-width:770px)"),
  };

  const [dealer, setDealer] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [otpVerified, setOtpVerified] = React.useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dateFilter, setdateFilter] = useState(false);

  const handleDealer = (event) => {
    setDealer(event.target.value);
  };

  const handlePaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };
  const handleOtpVerified = (event) => {
    setOtpVerified(event.target.value);
  };

  return (
    <div
      className="Filter"
      style={{
        flexDirection: "column",
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: colors.secondaryBackground,
        // position: "absolute",
        // top: "15vh",
      }}
    >
      <div
        className="row1"
        style={{
          display: "flex",
          justifyContent: "center",
          // height: "25vh",
          // width: "60vw",
          // background: "black",
          flexDirection: "column",
          color: "black",
          marginLeft: "2vw",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div
          className="header"
          style={{ display: "flex", marginBottom: "5vh" }}
        >
          <Checkbox
            color="success"
            style={{ height: "17px", width: "17px", marginRight: "10px" }}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <span style={{ fontWeight: "500" }}>Filter By Dealer Name </span>
        </div>
        {isChecked == true ? (
          <div className="DealerName">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Dealer Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dealer}
                  style={{
                    width: Mq.sm ? "80vw" : "20vw",
                    marginRight: Mq.sm ? "0" : "5vw",
                    marginBottom: Mq.sm ? "2vh" : "",
                    background: colors.secondaryBackground,
                    //  textAnchor:"start"
                  }}
                  label="Choose Dealer"
                  onChange={handleDealer}
                >
                  {/* {retailers.map((value) => (
                  <MenuItem value={value.dealerId}>{value.dealerName}</MenuItem>
                ))} */}
                </Select>
              </FormControl>
            </Box>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* row 2  */}
      <div
        className="row2"
        style={{
          display: "flex",
          justifyContent: "center",
          // height: "20vh",
          // width: "20vw",
          // background: "black",
          marginBottom: "20px",
          flexDirection: "column",
          color: "black",
          marginLeft: "2vw",
        }}
      >
        <div
          className="header2"
          style={{ display: "flex", marginBottom: "5vh" }}
        >
          <Checkbox
            color="success"
            style={{ height: "17px", width: "17px", marginRight: "10px" }}
            checked={isSent}
            onChange={(e) => setIsSent(e.target.checked)}
          />
          <span style={{ fontWeight: "500" }}>Filter By Payment Status </span>
        </div>
        {isSent == true ? (
          <div className="Payment Status">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Payment Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={paymentStatus}
                  style={{
                    width: Mq.sm ? "80vw" : "20vw",
                    marginRight: Mq.sm ? "0" : "5vw",
                    marginBottom: Mq.sm ? "2vh" : "",
                    background: colors.secondaryBackground,
                    //  textAnchor:"start"
                  }}
                  label="Choose Payment Status"
                  onChange={handlePaymentStatus}
                >
                  {/* {retailers.map((value) => (
                  <MenuItem value={value.dealerId}>{value.dealerName}</MenuItem>
                ))} */}
                </Select>
              </FormControl>
            </Box>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* row3 */}
      <div
        className="row3"
        style={{
          display: "flex",
          justifyContent: "center",
          // height: "20vh",
          // width: "20vw",
          // background: "black",
          marginBottom: "20px",
          flexDirection: "column",
          color: "black",
          marginLeft: "2vw",
        }}
      >
        <div
          className="header3"
          style={{ display: "flex", marginBottom: "5vh" }}
        >
          <Checkbox
            color="success"
            style={{ height: "17px", width: "17px", marginRight: "10px" }}
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />
          <span style={{ fontWeight: "500" }}>
            Filter By Otp Verification Status{" "}
          </span>
        </div>
        {isVerified == true ? (
          <div className="Otp Verified">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Otp Verification Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={otpVerified}
                  style={{
                    width: Mq.sm ? "80vw" : "20vw",
                    marginRight: Mq.sm ? "0" : "5vw",
                    marginBottom: Mq.sm ? "2vh" : "",
                    background: colors.secondaryBackground,
                    //  textAnchor:"start"
                  }}
                  label="Choose Otp Verification Status"
                  onChange={handleOtpVerified}
                >
                  {/* {retailers.map((value) => (
                  <MenuItem value={value.dealerId}>{value.dealerName}</MenuItem>
                ))} */}
                </Select>
              </FormControl>
            </Box>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className="row4"
        style={{
          display: "flex",
          justifyContent: "center",
          // height: "20vh",
          // width: "20vw",
          // background: "black",
          marginBottom: "20px",
          flexDirection: "column",
          color: "black",
          marginLeft: "2vw",
        }}
      >
        <div
          className="header4"
          style={{ display: "flex", marginBottom: "5vh" }}
        >
          <Checkbox
            color="success"
            style={{ height: "17px", width: "17px", marginRight: "10px" }}
            checked={dateFilter}
            onChange={(e) => setdateFilter(e.target.checked)}
          />
          <span style={{ fontWeight: "500" }}>Filter By Invoice Date </span>
        </div>
        {dateFilter==true ?(
        <div className="InvoiceDate" style={{display:"flex",flexDirection:"column",width:"20vw"}}>
          {/* todate */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{marginBottom:"2vh"}}/>
          </LocalizationProvider>
          {/* from date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
    ):<></>}
      </div>
    </div>
  );
}

export default Filter;
// sx={{
//     color: pink[800],
//     '&.Mui-checked': {
//       color: pink[600],
//     },
//   }}

{
  /* <Checkbox defaultChecked color="success" />; */
}

{
  /* <div>
<Button
  variant="contained"
  style={{ marginBottom: "20px", marginLeft: "60px" }}
>
  Apply Filter
</Button>
</div> */
}
