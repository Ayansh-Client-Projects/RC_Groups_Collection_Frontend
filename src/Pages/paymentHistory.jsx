import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { default as React, useEffect, useState } from "react";
import ApiServices from "../Services/Api.js";
import LocalStorage from "../Services/LocalStorage.js";
import Validation from "../Services/Validation";
import colors from "../Utility/colors";

function PaymentHistory(props) {
  const Mq = {
    sm: useMediaQuery("(max-width:768px)"),
    lg: useMediaQuery("(min-width:770px)"),
  };
  
  async function getAllTransactions(params) {
    let token = LocalStorage.getToken();
    try {
      let getallTransaction_url = ApiServices.GETALLTRANSACTIONS;
      const response = await axios.get(
        getallTransaction_url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
           params: params 
        },
       
      );

      if (response.status == 200) {
        let data = response.data;
        let payload = data.PayLoad;
        let transactions = payload.transactions;
        let tableRow = [];
        transactions.map((value, index) => {
          tableRow.push({
            id: index + 1,
            dealerName: value.dealerId.partyName,
            invoice: value.invoice,
            invoiceDate: value.invoiceDate,
            mode: value.mode,
            status: value.status,
            otpVerified:
              value.otpVerified == true ? "Verified" : "Unverified",
            amount: value.amount,
          });
        });
        setRows(tableRow);
        // console.log(transactions);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  }
  useEffect(() => {
    getAllTransactions({});
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dealerName",
      headerName: "Dealer ",
      width: 150,
      editable: false,
    },
    {
      field: "invoice",
      headerName: "Invoice Number",
      width: 150,
      editable: false,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      width: 150,

      editable: false,
    },

    {
      field: "mode",
      headerName: "Payment Mode",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: "status",
      headerName: "Payment Status",
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },

    {
      field: "otpVerified",
      headerName: "OTP Verified",
      // type: "boolean",
      width: 150,
      editable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      editable: false,
    },
  ];
  const [rows, setRows] = useState([]);

  // const [filter, setFilter] = React.useState("");

  // const handleChange = (event) => {
  //   // setFilter(event.target.value);

  // };
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleClickOpenFilter = () => {
    console.log(openFilter);
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [dealer, setDealer] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [otpVerified, setOtpVerified] = React.useState("");
  const [todate, setToDate] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isDateFilter, setisDateFilter] = useState(false);

  const handleDealer = (event) => {
    setDealer(event.target.value);
  };

  const handlePaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };
  const handleOtpVerified = (event) => {
    setOtpVerified(event.target.value);
  };

 
 function applyFilter() {
    
    let newParams= {}
    if(isChecked==true && dealer!=""){
      newParams.dealerId = dealer
    }
    else {
      setIsChecked(false)
    }
    if(isSent==true){
      let result1 = Validation.validatePaymentStatus(paymentStatus);
    if (result1.valid == true) {
      
      newParams.status = paymentStatus
    }
    else {
      setIsSent(false)
    }
    }
    if(isVerified==true){
      let result2 = Validation.validateOTPVerificationStatus(otpVerified);
      if (result2.valid == true) {

        newParams.otpVerified = otpVerified
      }
      else {
        setIsVerified(false)
      }
    }
    if(isDateFilter==true){
      let result3 = Validation.validateDate(todate);
      if (result3.valid == true) {newParams.toDate = todate}
      let result4 = Validation.validateDate(fromdate);
      if (result4.valid == true) {newParams.fromDate = fromdate}  

      if (result3.valid == false && result4.valid == false) {
        setisDateFilter(false)
      }
    }

  if(newParams!={})
    {getAllTransactions(newParams)}
    handleCloseFilter()
  }

  return (
    <>
      <div style={{ background: colors.background }}>
        <div
          style={{
            display: "flex",
            width: "100vw",
            // alignItems: "center",
            justifyContent: "center",
            height: "90vh",
            flexDirection: "column",
            marginLeft: "5vw",
          }}
        >
          <div
            className="filter"
            style={{
              display: "flex",
              alignItems: "center",
              width: "90vw",
              background: "white",
              marginTop: "2vh",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              justifyContent:Mq.sm ? "flex-start":"flex-end"
            }}
          >
            <Button
              variant="contained"
              style={{
                marginLeft: Mq.sm ?"2vw":"0vw",
                marginRight: Mq.sm ?"0vw":"2vw",
                marginBottom: "2vh",
                marginTop: "2vh",
                background :colors.primary ,
                
              }}
              // onClick={handleClickOpenFilter}
              onClick={() => {
                handleClickOpenFilter();
              }}
            >
              Apply Filter
            </Button>
          </div>
          <Box
            sx={{
              height: "70vh",
              width: "90vw",
              background: "white",
              borderBottomRightRadius: "15px",
              borderBottomLeftRadius: "15px",
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              // slots={{toolbar:GridToolbar}}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 9,
                  },
                },
              }}
              pageSizeOptions={[9]}
              disableRowSelectionOnClick
            />
          </Box>
          ;
        </div>
      </div>
      <React.Fragment>
        <Dialog
          open={openFilter}
          keepMounted
          onClose={handleCloseFilter}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ background: colors.background }}>
            {"Filter"}
          </DialogTitle>
          <DialogContent>
            <div
              className="Filter"
              style={{
                flexDirection: "column",
                display: "flex",
                // height: "100vh",
                // width: "100vw",
                // background: colors.secondaryBackground,
                // position: "absolute",
                // top: "15vh",
                overflowY: "auto",
                overflowX: "hidden",
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
                    style={{
                      height: "17px",
                      width: "17px",
                      marginRight: "10px",
                    }}
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span style={{ fontWeight: "500" }}>
                    Filter By Dealer Name{" "}
                  </span>
                </div>
                {isChecked == true ? (
                  <div className="DealerName" >
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" >
                          Dealer Name
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={dealer}
                          style={{
                            // width: Mq.sm ? "80vw" : "20vw",
                            marginRight: Mq.sm ? "0" : "5vw",
                            marginBottom: Mq.sm ? "2vh" : "",
                            background: colors.secondaryBackground,
                            //  textAnchor:"start"
                            width: Mq.sm ? "65vw" : "20vw",
                          }}
                          label="Choose Dealer"
                          onChange={handleDealer}
                        >
                          {props.retailers.map((value) => (
                            <MenuItem value={value.dealerId}>
                              {value.dealerName}
                            </MenuItem>
                          ))}
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
                    style={{
                      height: "17px",
                      width: "17px",
                      marginRight: "10px",
                    }}
                    checked={isSent}
                    onChange={(e) => setIsSent(e.target.checked)}
                  />
                  <span style={{ fontWeight: "500" }}>
                    Filter By Payment Status{" "}
                  </span>
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
                            // width: Mq.sm ? "80vw" : "20vw",
                            marginRight: Mq.sm ? "0" : "5vw",
                            marginBottom: Mq.sm ? "2vh" : "",
                            background: colors.secondaryBackground,
                            //  textAnchor:"start"
                            width: Mq.sm ? "65vw" : "20vw",
                          }}
                          label="Choose Payment Status"
                          onChange={handlePaymentStatus}
                        >
                          <MenuItem value={"sent"}>SENT</MenuItem>
                          <MenuItem value={"pending"}>PENDING</MenuItem>
                          <MenuItem value={"failed"}>FAILED</MenuItem>
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
                    style={{
                      height: "17px",
                      width: "17px",
                      marginRight: "10px",
                      
                    }}
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                  />
                  <span style={{ fontWeight: "500" }}>
                    Filter By Otp Verification Status{" "}
                  </span>
                </div>
                {isVerified == true ? (
                  <div className="Otp Verified">
                    <Box sx={{   width: Mq.sm ? "65vw" : "20vw", }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Otp Verification Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={otpVerified}
                          style={{
                            width: Mq.sm ? "65vw" : "20vw",
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
                          <MenuItem value={"true"}>VERIFIED</MenuItem>
                          <MenuItem value={"false"}>UNVERIFIED</MenuItem>
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
                    style={{
                      height: "17px",
                      width: "17px",
                      marginRight: "10px",
                    }}
                    checked={isDateFilter}
                    onChange={(e) => setisDateFilter(e.target.checked)}
                  />
                  <span style={{ fontWeight: "500" }}>
                    Filter By Invoice Date{" "}
                  </span>
                </div>
                {isDateFilter == true ? (
                  <div
                    className="InvoiceDate"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "20vw",
                    }}
                  >
                    {/* todate */}
                    <span style={{ fontWeight: "400", marginBottom: "10px" }}>
                      * To-Date
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(e) => {
                          setToDate(e.format("YYYY-MM-DD"));
                        }}
                        sx={{
                          marginBottom: "2vh",
                          background: colors.secondaryBackground,
                            width: Mq.sm ? "65vw" : "20vw",
                          
                        }}
                      />
                    </LocalizationProvider>
                    {/* from date */}
                    <span style={{ fontWeight: "400", marginBottom: "10px",width:"65vw" }}>
                      * From-Date
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(e) => {
                          setFromDate(e.format("YYYY-MM-DD"));
                        }}
                        sx={{ background: colors.secondaryBackground , width: Mq.sm ? "65vw" : "20vw",}}
                      />
                    </LocalizationProvider>
                  </div>
                ) : (
                  <></>
                )}
              </div>{" "}
              <div></div>
            </div>
          </DialogContent>
          <DialogActions sx={{ background: colors.background }}>
            <Button onClick={handleCloseFilter}>Cancel</Button>
            <Button onClick={applyFilter}>APPLY</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default PaymentHistory;
