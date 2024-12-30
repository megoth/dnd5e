import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useLdo } from "@ldo/solid-react";
import { getPath } from "../../utils/url";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";

export default function ClassPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { isLoading, data: classInfo } = useSWR(
    () => url,
    async () => {
      await getResource(getPath(url)).readIfUnfetched();
      return getSubject(ClassShapeType, url);
    },
  );

  if (isLoading || !classInfo?.["@id"]) {
    return <Loading />;
  }

  return (
    <Layout pageName="classesPageTitle">
      <Content>
        <h1>{classInfo.label}</h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
