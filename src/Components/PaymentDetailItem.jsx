import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
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

  return (
    <div>
      <div
        style={{
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        (
        <Box sx={{ height: "75vh", width: "90vw", marginLeft: "5vw" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
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
        );
      </div>
    </div>
  );
}

export default Table;
