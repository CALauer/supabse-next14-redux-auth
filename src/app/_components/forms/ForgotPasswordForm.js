"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Invalid email address.");
      return;
    }

    let forgotPassword = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });
    forgotPassword = await forgotPassword.json();
    if (forgotPassword) {
      setResponseMessage(forgotPassword.message);
      setResponseDetails(forgotPassword.details);
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
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <button className="sign-in">Send Email</button>
        </div>
      </form>
      <Link href="/">Sign In</Link>
    </>
  );
}

export default ForgotPasswordForm;
