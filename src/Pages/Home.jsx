import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../Services/LocalStorage.js";

import ListItemText from "@mui/material/ListItemText";
import UserData from "./UserData";
import { IoMdMenu } from "react-icons/io";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";
function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [appIndex, setAppIndex] = React.useState(0);
  // const [appIndex,setAppIndex]= React.useState(0)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <GiMoneyStack
              style={{ height: "30px", width: "30px", marginRight: "20px" }}
              title="New Payment"
            />
            <ListItemText primary="New Payment" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding style={{ display: "flex" }}>
          <ListItemButton>
            <GiReceiveMoney
              style={{ height: "30px", width: "30px", marginRight: "20px" }}
              title="Payment History"
            />
            <ListItemText
              primary="Payment History"
              style={{ marginTop: "15px" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton   onClick={()=>{logOut()}}>
            <TbLogout2
              style={{
                height: "25px",
                width: "25px",
                marginRight: "20px",
              }}
             
              title="LogOut"
            />
            <ListItemText primary="LogOut" style={{ marginLeft: "7px" }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  //   function newPayment() {
  //     setAppIndex(0);
  //   }
  //   function paymentHistory() {
  //     setAppIndex(1);
  //   }

  function logOut() {
    navigate("/");
    LocalStorage.removeToken();
    console.log ("hi")
  }

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
      <div
        className="navbar"
        style={{ height: "7vh", width: "100vw", backgroundColor: "#2DA8F2" }}
      >
        <IoMdMenu
          style={{
            height: "35px",
            width: "35px",
            marginLeft: "40px",
            marginTop: "7px",
          }}
          onClick={toggleDrawer(true)}
        />
      </div>

      <div className="Drawer">
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <div className="form">
        {/* <UserData /> */}
      </div>
    </div>
  );
}

export default Home;
