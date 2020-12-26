import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import SplashPage from "../splashPage";
import Dashboard from "../dashboard";

export default function HomePage() {
  const { session } = useSession();
  const { isLoggedIn } = session.info;
  return isLoggedIn ? <Dashboard /> : <SplashPage />;
}
