import React from "react";
import SplashPage from "../splashPage";
import Dashboard from "../dashboard";
import { useSolidAuth } from "@ldo/solid-react";

export default function HomePage() {
  const { session } = useSolidAuth();
  return session.isLoggedIn ? <Dashboard /> : <SplashPage />;
}
