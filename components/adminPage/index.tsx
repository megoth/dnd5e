import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";

export default function AdminPage() {
  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="adminTitle" bundle="admin" />
        </h1>
        <p>
          <Translation id="workInProgress" />
        </p>
      </Content>
    </Layout>
  );
}
