import React from "react";
import Layout from "../layout";
import Translation from "../translation";

export default function AdminPage() {
  return (
    <Layout>
      <h1>
        <Translation id="adminTitle" bundle="admin" />
      </h1>
      <p>
        <Translation id="workInProgress" />
      </p>
    </Layout>
  );
}
