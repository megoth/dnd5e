import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function AdminFAQPAge() {
  return (
    <Layout pageName="faqPageTitle">
      <Content>
        <h1>
          <Translation id="faqsPageTitle" bundle="admin" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
