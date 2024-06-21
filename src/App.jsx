import SignIn from "../src/Pages/SignIn";
import Home from "../src/Pages/Home.jsx";
import SignUp from "../src/Pages/SignUp.jsx";
import OTP from "./Pages/Otp.jsx";
import UserData from "./Pages/UserData.jsx";
import Error404 from "./Pages/Error404.jsx";
import { Route, Routes } from "react-router-dom";
import NewPayment from "./Pages/NewPayment.jsx";
import PaymentHistory from "./Pages/PaymentHistory.jsx";
import "./index.css";
import "./App.css";


function App() {
  let isLoggedIn = false;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn == true ? <NewPayment /> : <SignIn />}
          // element={isLoggedIn == true ? <NewPayment /> : <SignIn />}
        ></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}>
          <Route path="newpayment" element={<NewPayment />}></Route>
          <Route path="paymenthistory" element={<PaymentHistory />}></Route>     
        </Route>
        
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
