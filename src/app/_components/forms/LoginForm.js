"use client";
import { setSession } from "../../_redux/features/session/sessionSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EnochFormLogo from "../svgs/EnochFormLogo";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setResponseMessage("Please fill out all fields.");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Invalid email address.");
      return;
    }
    let login = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    login = await login.json();
    if (login.success) {
      dispatch(setSession(login.session));
      router.push("/dashboard");
    } else {
      setResponseMessage(login.message);
      setResponseDetails(login.details);
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

      <form className="login-form">
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
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          ></span>
        </div>

        <div>
          <button className="sign-in" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <Link href="/forgot-password">Forgot Password?</Link>
      </form>
    </>
  );
}

export default LoginForm;
