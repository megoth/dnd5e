import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";
import { useSolidAuth } from "@ldo/solid-react";
import FAQ from "../faq";
import Unauthenticated from "../unauthenticated";

export default function YouPage() {
  const { l10n } = useLocalization();
  const { session } = useSolidAuth();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {session.isLoggedIn && <p>More stuff to come!</p>}
      {!session.isLoggedIn && (
        <>
          <Content>
            <h1>
              <Translation id="yourStuff" />
            </h1>
            <Markdown>{l10n.getString("yourStuffDescription")}</Markdown>
          </Content>
          <Unauthenticated />
          <Content>
            <FAQ id="whatIsSolid" variant="small" />
            <FAQ id="whyLogInWithSolid" variant="small" />
          </Content>
        </>
      )}
    </Layout>
  );
}
