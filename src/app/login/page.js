import React from "react";
import LoginForm from "../_components/forms/LoginForm";
import EnochFormLogo from "../_components/svgs/EnochFormLogo";

export default function page() {
  return (
    <div className="page">
      <div className="login-page">
        <div className="styled-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
