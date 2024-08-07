import SignIn from "../src/Pages/SignIn";
import Home from "../src/Pages/Home.jsx";
import SignUp from "../src/Pages/SignUp.jsx";
import OTP from "./Pages/Otp.jsx";
import Filter from "./Pages/Filter.jsx";
import Error404 from "./Pages/Error404.jsx";
import { Route, Routes } from "react-router-dom";
import NewPayment from "./Pages/NewPayment.jsx";
import PaymentHistory from "./Pages/paymentHistory.jsx";
import "./index.css";
import "./App.css";
import { useLoading } from "./Utility/customHooks.jsx";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  let isLoggedIn = false;
  const { loading } = useLoading();
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn == true ? <NewPayment /> : <SignIn />}
        ></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}>
          <Route path="newpayment" element={<NewPayment />}></Route>
          <Route path="paymenthistory" element={<PaymentHistory />}></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/filter" element={<Filter />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
