import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

export default function ErrorsPage() {
  const app = useApp();
  return (
    <Layout pageName={getMessage(app, "errorsPageTitle", { bundle: "admin" })}>
      <Content>
        <h1>
          <Translation id="errorsPageTitle" bundle="admin" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
