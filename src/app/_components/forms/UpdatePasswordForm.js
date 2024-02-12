"use client";
import Link from "next/link";
import React, { useState } from "react";

function UpdatePasswordForm(props) {
  const showSignIn = props.showSignIn !== null ? props.showSignIn : true;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password) {
      setError("Password is required.");
      return;
    }
    let updatePassword = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password }),
    });
    updatePassword = await updatePassword.json();
    if (updatePassword.success) {
      setResponseMessage(updatePassword.message);
      setResponseDetails(updatePassword.details);
    } else {
      setResponseMessage(updatePassword.message);
      setResponseDetails(updatePassword.details);
    }
  };
  return (
    <>
      {(responseMessage || responseDetails) && (
        <div className="form-response-alert">
          {responseMessage && <h1>{responseMessage}</h1>}
          {responseDetails && <p>{responseDetails}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="auth">
        <div>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <button className="sign-in">Reset Password</button>
        </div>
      </form>
      {showSignIn && <Link href="/">Sign In</Link>}
    </>
  );
}

export default UpdatePasswordForm;
