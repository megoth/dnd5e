import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import Authenticated from "../authenticated";
import Unauthenticated from "../unauthenticated";

export default function Session() {
  const { session } = useSession();

  return session.info.isLoggedIn ? <Authenticated /> : <Unauthenticated />;
}
