"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import EnochLogo from "../svgs/EnochLogo";

export default function DesktopNav() {
  const session = useSelector((state) => state.session.session);
  if (!session) {
    return (
      <nav>
        <div className="desktop-navigation-bar">
          <EnochLogo />
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  // Logged in routes
  return (
    <nav>
      <div className="desktop-navigation-bar">
        <EnochLogo />
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
