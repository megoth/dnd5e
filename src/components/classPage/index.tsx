import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";
import ClassPageHitPoints from "./hitPoints";
import ClassPageProficiencies from "./proficiencies";
import ClassPageEquipment from "./equipment";
import { classResourceUrls } from "../../utils/dnd5e";
import ClassPageLevels from "./levels";
import ClassPageFeatures from "./features";
import ClassPageMulticlassing from "./multiclassing";

export default function ClassPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: classInfo } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(ClassShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `class-${classInfo["@id"]}`,
    async () => {
      await Promise.all(
        classResourceUrls(classInfo).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
      // must run second time to load class features
      await Promise.all(
        classResourceUrls(classInfo).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (isLoading || !classInfo?.["@id"]) {
    return <Loading />;
  }

  return (
    <Layout pageName="classesPageTitle">
      <WarningMessage>
        <Translation id="workInProgress" />
      </WarningMessage>
      <Content>
        <h1>{classInfo.label}</h1>
        <ClassPageMulticlassing classInfo={classInfo} />
        <ClassPageLevels classInfo={classInfo} />
        <h2>
          <Translation id="classFeatures" />
        </h2>
        <p>
          <Translation
            id="classFeaturesDescription"
            vars={{ className: classInfo.label }}
          />
        </p>
        <ClassPageHitPoints classInfo={classInfo} />
        <ClassPageProficiencies classInfo={classInfo} />
        <ClassPageEquipment classInfo={classInfo} />
        <ClassPageFeatures classInfo={classInfo} />
      </Content>
    </Layout>
  );
}
