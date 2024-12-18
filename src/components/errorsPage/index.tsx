import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function ErrorsPage() {
  return (
    <Layout pageName="errorsPageTitle" bundle="admin">
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
