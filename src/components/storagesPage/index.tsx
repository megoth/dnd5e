import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";

export default function StoragesPage() {
  const { session } = useSolidAuth();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {session.isLoggedIn && <p>More stuff to come!</p>}
      {!session.isLoggedIn && (
        <>
          <Content>
            <h1>
              <Translation id="storages" />
            </h1>
          </Content>
          <Unauthenticated />
        </>
      )}
    </Layout>
  );
}
