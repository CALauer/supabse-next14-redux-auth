"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Fixed the import
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EnochFormLogo from "../svgs/EnochFormLogo";

function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirm password state
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [responseMessage, setResponseMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Invalid email address.");
      return;
    }

    let register = await fetch("/api/auth/register", {
      // Changed to /register
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    register = await register.json();
    if (register.success) {
      setResponseMessage(register.message);
      setResponseDetails(register.details);
    } else {
      setResponseMessage(register.message);
      setResponseDetails(register.details);
    }
  };

  return (
    <>
      {(error || responseMessage || responseDetails) && (
        <div className="form-response-alert">
          {error && <h1>{error}</h1>}
          {responseMessage && <h1>{responseMessage}</h1>}
          {responseDetails && <p>{responseDetails}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="login-form">
        <EnochFormLogo />
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="sign-in">Register</button>
        </div>
        <Link href="/login">Already have an account? </Link>
      </form>
    </>
  );
}

export default RegisterForm;
