import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Breadcrumbs from "../breadcrumbs";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";
import Loading from "../loading";
import Icon from "../icon";
import { Storage } from "../../ldo/dnd5e.typings";

export default function StoragesPage() {
  const { session } = useSolidAuth();
  const { defaultStorage, storages, isLoading } = useStorage();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {!isLoading && !storages && <WarningMessage id="storageRecommended" />}
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { translationId: "storages" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="storages" /> (
          {(storages as Array<Storage>)?.length || 0})
        </h1>
        <div className="options">
          {session.isLoggedIn ? (
            <NavLink to="/storages/create" className="button">
              <Translation id="createStorage" />
            </NavLink>
          ) : (
            <button className="button" disabled={true} type="button">
              <Translation id="createStorage" />
            </button>
          )}
        </div>
        {isLoading && <Loading />}
        {!isLoading && storages && (
          <table className="table">
            <thead>
              <tr>
                <th>
                  <Translation id="name" />
                </th>
                <th>
                  <Translation id="isDefaultStorage" />
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
                  <td>
                    {storage["@id"] === defaultStorage["@id"] && (
                      <Icon name="tick" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Content>
    </Layout>
  );
}
