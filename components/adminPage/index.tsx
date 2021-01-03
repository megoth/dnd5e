import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

export default function AdminPage() {
  const app = useApp();
  return (
    <Layout
      pageName={getMessage(app, "adminPageTitle", {
        bundle: "admin",
      })}
    >
      <Content>
        <h1>
          <Translation id="adminPageTitle" bundle="admin" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
