import SignIn from "../src/Pages/SignIn";
import SignUp from "../src/Pages/SignUp.jsx";
import OTP from "./Pages/Otp.jsx";
import UserData from "./Pages/UserData.jsx";
import Error404 from "./Pages/Error404.jsx";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
// import PaymentHistory from "./Pages/PaymentHistory.jsx";
function App() {
  let isLoggedIn = false;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn == true ? <UserData /> : <SignIn />}
        ></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/form" element={<UserData />}></Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
      {/* <PaymentHistory /> */}
    </>
  );
}

export default App;
