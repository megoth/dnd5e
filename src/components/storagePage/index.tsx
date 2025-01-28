import React from "react";
import Layout from "../layout";
import Content from "../content";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import Loading from "../loading";
import useStorage from "../../hooks/useStorage";
import Translation from "../translation";
import useProfile from "../../hooks/useProfile";

export default function StoragePage() {
  const params = useParams();
  const url = atob(params.url);
  const { changeData, commitData, getResource, getSubject } = useLdo();
  const {
    defaultStorage,
    storages,
    mutate: mutateStorage,
    isLoading,
  } = useStorage();
  const { profile, mutate: mutateProfile } = useProfile();
  const navigate = useNavigate();

  const { data: storage } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(StorageShapeType, url);
    },
  );

  if (!storage) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const isDefaultStorage = storage["@id"] === defaultStorage["@id"];

  const changeDefaultStorage: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();
    const updatedProfile = changeData(
      profile,
      getResource(resourceUrl(profile["@id"])),
    );
    updatedProfile.defaultStorage = storage;
    await commitData(updatedProfile);
    await Promise.all([mutateProfile(), mutateStorage()]);
  };

  const deleteStorage: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();
    await getResource(resourceUrl(storage["@id"])).delete();
    const updatedProfile = changeData(
      profile,
      getResource(resourceUrl(profile["@id"])),
    );
    updatedProfile.storages = (storages || []).filter(
      (s) => s["@id"] !== storage["@id"],
    );
    await commitData(updatedProfile);
    await Promise.all([mutateProfile(), mutateStorage()]);
    await navigate("/storages");
  };

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { href: "/storages", translationId: "storages" },
          { text: storage.label },
        ]}
      />
      <Content>
        <h1>{storage.label}</h1>
        {isDefaultStorage && (
          <p className="notification">
            <Translation id="isDefaultStorage" />
          </p>
        )}
        <div className="options">
          <button
            className="button"
            type="button"
            disabled={
              isLoading ||
              isDefaultStorage ||
              !(storages || []).find((s) => s["@id"] === storage["@id"])
            }
            onClick={changeDefaultStorage}
          >
            <Translation id="setAsDefaultStorage" />
          </button>
          <button
            className="button"
            type="button"
            disabled={isDefaultStorage}
            onClick={deleteStorage}
          >
            <Translation id="deleteStorage" />
          </button>
        </div>
      </Content>
    </Layout>
  );
}
