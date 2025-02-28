import React, { useEffect } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { useLocation, useParams } from "react-router-dom";
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
import Illustration from "../illustration";
import Markdown from "react-markdown";
import Breadcrumbs from "../breadcrumbs";
import SubclassInfo from "../subclassInfo";

export default function ClassPage() {
  const params = useParams();
  const url = atob(params.url);
  const { dataset, getResource, getSubject } = useLdo();
  const location = useLocation();

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
        classResourceUrls(classInfo, dataset).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
      // must run second time to load class features
      await Promise.all(
        classResourceUrls(classInfo, dataset).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  useEffect(() => {
    if (isLoading || location.hash === "") return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [isLoading, location]);

  if (!classInfo?.["@id"]) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/classes", translationId: "classes" },
          { text: classInfo.label },
        ]}
      />
      {!isLoading && classInfo.illustration && (
        <Illustration subject={classInfo.illustration} />
      )}
      <Content>
        <h1>{classInfo.label}</h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <ClassPageMulticlassing classInfo={classInfo} />
            {classInfo.description && (
              <Markdown>{classInfo.description}</Markdown>
            )}
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
          </>
        )}
      </Content>
      {!isLoading && classInfo.subclasses.length > 0 && (
        <>
          <Content>
            <h2>
              <Translation id="subclasses" />
            </h2>
          </Content>
          {classInfo.subclasses
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((subclass) => (
              <SubclassInfo key={subclass["@id"]} subclass={subclass} />
            ))}
        </>
      )}
    </Layout>
  );
}
