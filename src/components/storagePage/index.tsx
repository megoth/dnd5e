import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";

export default function StoragePage() {
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { href: "/storages", translationId: "storages" },
          { text: "TEMP" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="storages" />
        </h1>
        <p>
          <Translation id="pageRequiresAuthentication" />
        </p>
      </Content>
    </Layout>
  );
}
