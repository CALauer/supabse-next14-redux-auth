"use client";
import Link from "next/link";
import React, { useState } from "react";

function UpdateEmailForm(props) {
  const email = props.email;
  const showSignIn = props.showSignIn !== null ? props.showSignIn : true;
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!emailInput) {
      setResponseMessage("Email is required.");
      return;
    } else if (emailInput === email) {
      setResponseMessage(
        "Your new email cannot be the same as your old email."
      );
    } else {
      let updateEmail = await fetch("/api/auth/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      updateEmail = await updateEmail.json();
      if (updateEmail.success) {
        setResponseMessage(updateEmail.message);
        setResponseDetails(updateEmail.details);
      } else {
        setResponseMessage(updateEmail.message);
        setResponseDetails(updateEmail.details);
      }
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
            type="email"
            placeholder={email}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <button className="sign-in">Update Email</button>
        </div>
      </form>
      {showSignIn && <Link href="/">Sign In</Link>}
    </>
  );
}

export default UpdateEmailForm;
