import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function LanguagesPage() {
  return (
    <Layout pageName={"languagesPageTitle"} bundle={"admin"}>
      <Content>
        <h1>
          <Translation id="languagesPageTitle" bundle="admin" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}