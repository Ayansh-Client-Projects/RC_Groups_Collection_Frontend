import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import colors from "../Utility/colors";
function Table() {
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
      field: "invDate",
      headerName: "Receipt Date",
      width: 150,

      editable: false,
    },

    {
      field: "Payemnt",
      headerName: "Payment Mode",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      editable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 2,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 3,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 4,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 5,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 6,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
    {
      id: 7,
      invoice: "Inv-405",
      dealerId: "Saha Automobiles",
      amount: 14,
      invDate: "13 JUL",
      Payemnt: "Online",
    },
  ];

  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
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
          style={{
            display: "flex",
            alignItems: "center",
            width: "90vw",
            background: colors.background,
            marginTop: "2vh",
            borderRadius: "5px",
          }}
        >
          {/* <HiFilter title="Filter" style={{color:"black" ,height:"22px",width:"30px",marginTop:"23px"}} /> */}
          <FormControl variant="standard" sx={{ m: 1, minWidth: "300px" }}>
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
          sx={{ height: "75vh", width: "90vw", background: colors.background }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            // slots={{
            //   toolbar: GridToolbar,
            // }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
        ;
      </div>
    </div>
  );
}

export default Table;
