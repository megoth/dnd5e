import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import { useLdo, useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";
import useProfile from "../../hooks/useProfile";
import Loading from "../loading";
import { SolidProfile } from "../../ldo/dnd5e.typings";
import ErrorMessage from "../errorMessage";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import { resourceUrl } from "../../utils/url";
import { useNavigate } from "react-router";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  location: string;
  setAsDefault: boolean;
};

function suggestStorageLocation(profile?: SolidProfile): string {
  return profile
    ? `${profile.storage["@id"]}public/dnd5e/${crypto.randomUUID()}.ttl`
    : "";
}

function suggestStorageName(profile?: SolidProfile): string {
  if (!profile) return "D&D5e Storage";
  return profile.name.charAt(profile.name.length - 1) === "s"
    ? `${profile.name}' Storage`
    : `${profile.name}'s Storage`;
}

export default function StorageCreatePage() {
  const { session } = useSolidAuth();
  const { profile, isLoading, error, mutate } = useProfile();
  const { changeData, createData, commitData, getResource } = useLdo();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: suggestStorageName(profile),
      location: suggestStorageLocation(profile),
      setAsDefault: !profile?.defaultStorage,
    },
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Step 1: Create Storage
    const locationUrl = `${data.location}#index`;
    const newStorage = createData(
      StorageShapeType,
      locationUrl,
      getResource(data.location),
    );
    newStorage.type = { "@id": "Storage" };
    newStorage.label = data.name || "";
    await commitData(newStorage);
    // Step 2: Link to Storage from Solid profile
    const updatedProfile = changeData(
      profile,
      getResource(resourceUrl(profile["@id"])),
    );
    updatedProfile.storages = [...updatedProfile.storages, newStorage];
    if (data.setAsDefault) {
      updatedProfile.defaultStorage = newStorage;
    }
    await commitData(updatedProfile);
    await mutate(updatedProfile);
    // Step 3: Navigate to new storage
    navigate(`/storages/${btoa(newStorage["@id"])}`);
  };

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { href: "/storages", translationId: "storages" },
          { translationId: "createStorage" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="createStorage" />
        </h1>
        {!session.isLoggedIn && (
          <p>
            <Translation id="pageRequiresAuthentication" />
          </p>
        )}
        {session.isLoggedIn && (isLoading || !profile) && <Loading />}
        {session.isLoggedIn && !isLoading && profile && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="label">
              <Translation id="name" />
            </label>
            <input
              className="input"
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
            <label htmlFor="location" className="label">
              <Translation id="location" />
            </label>
            <input
              className="input text-sm"
              id="location"
              type="url"
              {...register("location", { required: true })}
            />
            <label className="label">
              <input
                className="checkbox"
                disabled={!profile.defaultStorage}
                type="checkbox"
                {...register("setAsDefault")}
              />
              <Translation id="setAsDefaultStorage" />
              {!profile.defaultStorage && (
                <p className="notification">
                  <Translation id="setAsDefaultStorageDescription" />
                </p>
              )}
            </label>
            <button className="button w-full" type="submit">
              <Translation id="createStorage" />
            </button>
          </form>
        )}
      </Content>
      {!session.isLoggedIn && <Unauthenticated />}
    </Layout>
  );
}
