import React, { Fragment } from "react";
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
    async () =>
      Promise.all([
        Promise.all(
          classInfo.proficiencies.map((proficiency) =>
            getResource(resourceUrl(proficiency["@id"])).readIfUnfetched(),
          ),
        ),
        Promise.all(
          classInfo.proficiencyChoices.flatMap((choice) =>
            choice.from.references
              ?.map(
                (reference) =>
                  reference.proficiency["@id"] ||
                  reference.spell["@id"] ||
                  reference.language["@id"] ||
                  reference.equipment["@id"],
              )
              .map((referenceUrl) =>
                getResource(resourceUrl(referenceUrl)).readIfUnfetched(),
              ),
          ),
        ),
        Promise.all(
          classInfo.savingThrows.map((savingThrow) =>
            getResource(resourceUrl(savingThrow["@id"])).readIfUnfetched(),
          ),
        ),
        Promise.all(
          classInfo.startingEquipment.map((startingEquipment) =>
            getResource(
              resourceUrl(startingEquipment.equipment["@id"]),
            ).readIfUnfetched(),
          ),
        ),
      ]),
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
      </Content>
    </Layout>
  );
}
