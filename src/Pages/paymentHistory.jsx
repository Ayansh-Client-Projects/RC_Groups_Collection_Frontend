import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ApiServices from "../Services/Api.js";
import LocalStorage from "../Services/LocalStorage.js";
import colors from "../Utility/colors";
function PaymentHistory() {
  useEffect(() => {
    async function getAllTransactions() {
      let token = LocalStorage.getToken();
      try {
        // let new_url = Base_url + "?userId=" + sendUserid;
        let getallTransaction_url = ApiServices.GETALLTRANSACTIONS;
        const response = await axios.get(getallTransaction_url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200) {
          let data = response.data;
          let payload = data.PayLoad;
          let transactions = payload.transactions;
          let tableRow = [];
          transactions.map((value, index) => {
            tableRow.push({
              id: index+1,
              dealerId: value.dealerId,
              invoice: value.invoice,
              invoiceDate: value.invoiceDate,
              mode: value.mode,
              status: value.status,
              otpVerified: value.otpVerified,
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
    getAllTransactions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dealerId",
      headerName: "Dealer name",
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

  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
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
          }}
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: "275px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Filter By Dealer
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filter}
              onChange={handleChange}
              label="Filter By Dealer"
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
  );
}

export default PaymentHistory;
