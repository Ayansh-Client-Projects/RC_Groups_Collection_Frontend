import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";

function FilterDialog() {
  const [dealer, setDealer] = React.useState("");

  const handleDealer = (event) => {
    setDealer(event.target.value);
  };
  const [paymentStatus, setPaymentStatus] = React.useState("");

  const handlePaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };
  const handleOtpVerified = (event) => {
    setOtpVerified(event.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        // justifyContent: "space-around",
        height: "50vh",
        width: "60vw",
        background: "#CDE8E5",
        position: "absolute",
        top: "15vh",
      }}
    >
      <div
        className="Filter"
        style={{
          display: "flex",
          //   justifyContent: "space-around",
          height: "30vh",
          width: "60vw",
          background: "#CDE8E5",
          flexDirection: "column",
        }}
      >
        <div
          className="filterByDealer"
          style={{
            display: "flex",

            color: "black",
            flexDirection: "column",
          }}
        >
          <div className="header">
            <input
              type="checkbox"
              style={{ height: "17px", width: "17px" }}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>Filter By Dealer Name </span>
          </div>
          {isChecked == true ? (
            <div className="DealerName">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Dealer Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={dealer}
                  onChange={handleDealer}
                  label="Dealer Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="filterByStatus"
          style={{
            display: "flex",
            color: "black",
            flexDirection: "column",
          }}
        >
          <div className="header">
            <input
              type="checkbox"
              style={{ height: "17px", width: "17px" }}
              checked={isSent}
              onChange={(e) => setIsSent(e.target.checked)}
            />
            <span>Filter By Payment Status </span>
          </div>
          {isSent == true ? (
            <div className="statusField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={paymentStatus}
                  onChange={handlePaymentStatus}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          className="filterByOtp"
          style={{
            display: "flex",
            color: "black",
            flexDirection: "column",
          }}
        >
          <div className="header">
            <input
              type="checkbox"
              style={{ height: "17px", width: "17px" }}
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
            />
            <span>Filter By Payment Otp </span>
          </div>
          {isVerified == true ? (
            <div className="OtpField">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Otp
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={isVerified}
                  onChange={handleOtpVerified}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Checkbox defaultChecked color="success" />
        {/* <div
          className="filterByDate"
          style={{
            display: "flex",
            color: "black",
            flexDirection: "column",
          }}
        >
          <div className="header">
            <input type="checkbox" style={{ height: "17px", width: "17px" }} />
            <span>Filter By Date </span>
          </div>

          <div className="DateRange"></div>
        </div> */}
      </div>
      <div>
        <Button
          variant="contained"
          style={{ marginBottom: "20px", marginLeft: "60px" }}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

export default FilterDialog;
// sx={{
//     color: pink[800],
//     '&.Mui-checked': {
//       color: pink[600],
//     },
//   }}
