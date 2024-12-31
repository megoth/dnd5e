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
        <h3>
          <Translation id="hitPoints" />
        </h3>
        <dl className="data-list">
          <dt>
            <Translation id="hitDie" />
          </dt>
          <dd>
            <Translation
              id="hitDiePerClassLevel"
              vars={{ hitDie: classInfo.hitDie, className: classInfo.label }}
            />
          </dd>
          <dt>
            <Translation id="hitPointsAt1stLevel" />
          </dt>
          <dd>
            <Translation
              id="hitPointsAt1stLevelDescription"
              vars={{ hitDie: classInfo.hitDie }}
            />
          </dd>
          <dt>
            <Translation id="hitPointsAtHigherLevels" />
          </dt>
          <dd>
            <Translation
              id="hitPointsAtHigherLevelsDescription"
              vars={{
                hitDie: classInfo.hitDie,
                hitDieBalanced: classInfo.hitDie / 2 + 1,
                className: classInfo.label,
              }}
            />
          </dd>
        </dl>
        <h3>
          <Translation id="proficiencies" />
        </h3>
        <ul>
          <li>
            {classInfo.proficiencies
              .map((proficiency) => proficiency.label)
              .join(", ")}
          </li>
          {classInfo.proficiencyChoices.map((choice) => (
            <li key={choice.description}>
              <Translation
                id="chooseNumberFrom"
                vars={{
                  number: choice.choose,
                  list: choice.from.references
                    .map(
                      (reference) =>
                        reference.proficiency?.label ||
                        reference.language?.label ||
                        reference.spell?.label ||
                        reference.equipment?.label,
                    )
                    .join(", "),
                }}
              />
            </li>
          ))}
        </ul>
      </Content>
    </Layout>
  );
}
