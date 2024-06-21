import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { IoMdMenu } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../Services/LocalStorage.js";
import colors from "../Utility/colors.js";
import NewPayment from "./NewPayment.jsx";
import PaymentHistory from "./PaymentHistory.jsx";

function Home() {
  const Mq = {
    sm: useMediaQuery("(max-width:600px)"),
    lg: useMediaQuery("(min-width:1001px)"),
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [appIndex, setAppIndex] = React.useState(0);
  // const [appIndex,setAppIndex]= React.useState(0)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        background: colors.background,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              newPayment();
            }}
          >
            <GiMoneyStack
              style={{
                height: "30px",
                width: "30px",
                marginRight: "20px",
                color: "black",
              }}
              title="New Payment"
            />
            <ListItemText style={{ color: "black" }} primary="New Payment" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding style={{ display: "flex" }}>
          <ListItemButton
            onClick={() => {
              paymentHistory();
            }}
          >
            <GiReceiveMoney
              style={{
                height: "30px",
                width: "30px",
                marginRight: "20px",
                color: "black",
              }}
              title="Payment History"
            />
            <ListItemText
              primary="Payment History"
              style={{ marginTop: "15px", color: "black" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              logOut();
            }}
          >
            <TbLogout2
              style={{
                height: "25px",
                width: "25px",
                marginRight: "20px",
                color: "black",
              }}
              title="LogOut"
            />
            <ListItemText
              primary="LogOut"
              style={{ marginLeft: "7px", color: "black" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ color: "black" }} />
    </Box>
  );

  function newPayment() {
    setAppIndex(0);
  }
  function paymentHistory() {
    setAppIndex(1);
  }

  function logOut() {
    navigate("/");
    LocalStorage.removeToken();
    console.log("hi");
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
        overflowX: "hidden",
        background: colors.secondaryBackground,
      }}
    >
      <div
        className="navbar"
        style={{
          height: "8vh",
          width: "100vw",
          backgroundColor: colors.primary,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IoMdMenu
          style={{
            height: "35px",
            width: "35px",
            margin: "2vw",
            cursor: "pointer",
          }}
          // onMouseMove={toggleDrawer(true)}
          onClick={toggleDrawer(true)}
        />
        <span
          style={{
            fontWeight: "500",
            fontSize: Mq.sm ? "4vh" : "4vh",
            width: "90vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // background:"black"
          }}
        ></span>
      </div>

      <div className="Drawer">
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <div className="payment">
        {appIndex == 0 ? (
          <NewPayment />
        ) : appIndex == 1 ? (
          <PaymentHistory />
        ) : (
          <NewPayment />
        )}
      </div>
    </div>
  );
}

export default Home;
