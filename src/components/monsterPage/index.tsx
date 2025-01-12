import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { MonsterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import {
  modifier,
  monsterArmorClass,
  monsterChallenge,
  monsterHP,
  monsterResourceUrls,
  monsterSavingThrow,
  monsterSpeed,
  monsterType,
  scoreModifier,
} from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import Translation from "../translation";
import Illustration from "../illustration";
import { useLocalization } from "@fluent/react";

export default function MonsterPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();
  const { l10n } = useLocalization();

  const { data: monster } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(MonsterShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `spell-${monster?.["@id"]}`,
    async () => {
      if (!monster) return null;
      await Promise.all(
        monsterResourceUrls(monster).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
      // TODO: design better solution
      // loads twice because of two-link-away-resources
      await Promise.all(
        monsterResourceUrls(monster).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (isLoading || !monster) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/monsters", translationId: "monsters" },
          { text: monster.label },
        ]}
      />
      {monster.illustration && <Illustration subject={monster.illustration} />}
      <Content>
        <h1>{monster.label}</h1>
        <p className="notification">
          {monster.size} {monsterType(monster)}
        </p>
        <dl className="data-list">
          {monster.monsterArmorClass.map((ac) => (
            <Fragment key={ac.ofType}>
              <dt>
                <Translation id="armorClass" />
              </dt>
              <dd>{monsterArmorClass(ac)}</dd>
            </Fragment>
          ))}
          <dt>
            <Translation id="hitPoints" />
          </dt>
          <dd>{monsterHP(monster)}</dd>
          <dt>
            <Translation id="challenge" />
          </dt>
          <dd>{monsterChallenge(monster)}</dd>
          <dt>
            <Translation id="speed" />
          </dt>
          <dd>{monsterSpeed(monster.monsterSpeed, l10n)}</dd>
        </dl>
        <h2>
          <Translation id="abilityScores" />
        </h2>
        <table>
          <thead>
            <tr>
              <th colSpan={2} />
              <th>
                <Translation id="modifier" />
              </th>
              <th>
                <Translation id="savingThrow" />
              </th>
            </tr>
          </thead>
          <tbody>
            {monster.monsterAbilities.map((monsterAbility) => (
              <tr key={monsterAbility.abilityScore["@id"]}>
                <td>{monsterAbility.abilityScore.label}</td>
                <td>{monsterAbility.value}</td>
                <td>{scoreModifier(monsterAbility.value)}</td>
                <td>{monsterSavingThrow(monsterAbility, monster)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className="data-list"></dl>
        <h2>
          <Translation id="monsterFeatures" />
        </h2>
        <dl className="data-list">
          {monster.monsterSkills.length > 0 && (
            <>
              <dt>
                <Translation id="skills" />
              </dt>
              <dd>
                {monster.monsterSkills
                  .map(
                    (skill) =>
                      `${skill.proficiency.skill.label} ${modifier(skill.value)}`,
                  )
                  .join(", ")}
              </dd>
            </>
          )}
        </dl>
        {monster.specialAbilities && (
          <>
            <h3>
              <Translation id="traits" />
            </h3>
            <dl className="data-list">
              {monster.specialAbilities.map((ability) => (
                <Fragment key={ability.label}>
                  <dt>{ability.label}</dt>
                  <dd>{ability.description}</dd>
                </Fragment>
              ))}
            </dl>
          </>
        )}
        {monster.monsterActions && (
          <>
            <h3>
              <Translation id="actions" />
            </h3>
            <dl className="data-list">
              {monster.monsterActions.map((action) => (
                <Fragment key={action.label}>
                  <dt>{action.label}</dt>
                  <dd>{action.description}</dd>
                </Fragment>
              ))}
            </dl>
          </>
        )}
        {monster.legendaryActions && (
          <>
            <h3>
              <Translation id="legendaryActions" />
            </h3>
            <dl className="data-list">
              {monster.legendaryActions.map((action) => (
                <Fragment key={action.label}>
                  <dt>{action.label}</dt>
                  <dd>{action.description}</dd>
                </Fragment>
              ))}
            </dl>
          </>
        )}
      </Content>
    </Layout>
  );
}
