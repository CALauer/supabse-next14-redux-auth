/* eslint-disable react/no-unescaped-entities */
"use client";

import "./styles/global.scss";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CheckSession from "./_actions/checkSession";
import { setSession } from "./_redux/features/session/sessionSlice";

const Page = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.session);
  const getActiveSession = async () => {
    if (!session) {
      const activeSession = await CheckSession();
      if (activeSession.success) {
        dispatch(setSession(activeSession.data.session));
        return;
      }
    }
  };
  useEffect(() => {
    getActiveSession();
  }, []);

  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="page">
      <h1>Hello</h1>
      <p>Welcome to our application!</p>
      <p>
        This project is built using Next.js 14, a popular React framework for
        building server-side rendered and statically generated web applications.
        Next.js provides a robust development environment and optimized
        production builds.
      </p>
      <p>
        We've integrated Redux, a predictable state container for JavaScript
        apps, to manage the application's state. Redux helps in maintaining a
        single source of truth for the state and enables efficient state
        management across components.
      </p>
      <p>
        Additionally, we're utilizing Supabase, an open-source Firebase
        alternative, for handling data storage, authentication, and real-time
        subscriptions. Supabase offers a flexible and scalable backend solution,
        allowing us to focus on building features rather than managing
        infrastructure.
      </p>
      <p>Feel free to explore the codebase and contribute to the project!</p>
    </div>
  );
};

export default Page;
