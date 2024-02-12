"use client";
import React from "react";
import RegisterForm from "../_components/forms/RegisterForm";
import { Provider } from "react-redux";
import { store } from "../_redux/store";

export default function page() {
  return (
    <div className="page">
      <Provider store={store}>
        <div className="login-page">
          <div className="styled-form">
            <RegisterForm />
          </div>
        </div>
      </Provider>
    </div>
  );
}
