import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";
import Breadcrumbs from "../breadcrumbs";

export default function CharactersPage() {
  const { session } = useSolidAuth();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { translationId: "charactersPageTitle" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="charactersPageTitle" />
        </h1>
        {!session.isLoggedIn && (
          <p>
            <Translation id="pageRequiresAuthentication" />
          </p>
        )}
      </Content>
      {session.isLoggedIn && <p>More stuff to come!</p>}
      {!session.isLoggedIn && <Unauthenticated />}
    </Layout>
  );
}
