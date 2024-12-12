import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";

export default function AdminPage() {
  return (
    <Layout pageName="adminPageTitle" bundle="admin">
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
