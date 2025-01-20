import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";
import Breadcrumbs from "../breadcrumbs";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";
import Loading from "../loading";

export default function StoragesPage() {
  const { session } = useSolidAuth();
  const { storages, isLoading } = useStorage();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { translationId: "storages" },
        ]}
      />
      {session.isLoggedIn && (
        <>
          <Content>
            <h1>
              <Translation id="storages" />
            </h1>
            <nav>
              <NavLink to="/storages/create" className="button">
                <Translation id="createStorage" />
              </NavLink>
            </nav>
            {isLoading && <Loading />}
            {storages && (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <Translation id="name" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {storages.map((storage) => (
                    <tr key={storage["@id"]}>
                      <td>
                        <NavLink to={`/storages/${btoa(storage["@id"])}`}>
                          {storage.label}
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Content>
        </>
      )}
      {!session.isLoggedIn && (
        <>
          <Content>
            <h1>
              <Translation id="storages" />
            </h1>
            <p>
              <Translation id="pageRequiresAuthentication" />
            </p>
          </Content>
          <Unauthenticated />
        </>
      )}
    </Layout>
  );
}
