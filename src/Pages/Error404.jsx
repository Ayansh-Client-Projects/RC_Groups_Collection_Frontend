import React from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  function navigateToSignIn() {
    navigate("/signin");
  }
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontWeight: "600",
      }}
    >
      <img
        src="src/assets/Error.svg"
        style={{ height: "50vh", width: "50vw" }}
      />
      <p style={{ color: "black" }}>
        {" "}
        OOPS!! Go to{" "}
        <span
          onClick={() => {
            navigateToSignIn();
          }}
          style={{ color: "blue" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Error404;
