"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSession,
  setSession,
} from "../_redux/features/session/sessionSlice";
import { useRouter } from "next/navigation";
import CheckSession from "../_actions/checkSession";

export default function Page() {
  const router = useRouter();
  const session = useSelector((state) => state.session.session);
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    let logout = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    logout = await logout.json();
    if (logout.success) {
      dispatch(clearSession());
      router.push("/");
    }
  };
  const getActiveSession = async () => {
    if (!session) {
      const activeSession = await CheckSession();
      if (activeSession.success) {
        dispatch(setSession(activeSession.data.session));
        return;
      } else {
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    getActiveSession();
  }, []);
  return (
    <div className="page padded">
      {/* <ExerciseBreakdownChart data={userExerciseLog} /> */}
      <h1>Dashboard</h1>
      <Link href="" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
}
