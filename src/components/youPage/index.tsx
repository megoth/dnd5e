import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";
import { useSolidAuth } from "@ldo/solid-react";
import FAQ from "../faq";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";
import Loading from "../loading";
import Unauthenticated from "../unauthenticated";

export default function YouPage() {
  const { l10n } = useLocalization();
  const { session } = useSolidAuth();
  const { defaultStorage, isLoading } = useStorage();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {isLoading && <Loading />}
      {defaultStorage && <p>Show some stuff for your storage</p>}
      {session.isLoggedIn && !isLoading && !defaultStorage && (
        <>
          <Content>
            <h1>
              <Translation id="yourStuff" />
            </h1>
            <Markdown>{l10n.getString("createStoragePitch")}</Markdown>
          </Content>
          <NavLink to="/storages/create" className="button">
            <Translation id="createStorage" />
          </NavLink>
        </>
      )}
      {!session.isLoggedIn && (
        <>
          <Content>
            <h1>
              <Translation id="yourStuff" />
            </h1>
            <Markdown>{l10n.getString("yourStuffDescription")}</Markdown>
          </Content>
          <Unauthenticated
            title={l10n.getString("loginPageTitle")}
            className="box max-w-72"
          />
          <Content>
            <FAQ id="whatIsSolid" variant="small" />
            <FAQ id="whyLogInWithSolid" variant="small" />
            <FAQ id="whatIsPod" variant="small" />
          </Content>
        </>
      )}
    </Layout>
  );
}
