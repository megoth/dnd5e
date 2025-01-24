import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import { NavLink, useParams } from "react-router-dom";
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
  monsterSenses,
  monsterSpeed,
  monsterType,
  scoreModifier,
} from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import Translation from "../translation";
import Illustration from "../illustration";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";

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

  if (!monster) {
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
          { href: "/monsters", translationId: "monsters" },
          { text: monster.label },
        ]}
      />
      {!isLoading && monster.illustration && (
        <Illustration subject={monster.illustration} />
      )}
      <Content>
        <h1>{monster.label}</h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <p className="notification">
              {monster.size} {monsterType(monster)},{" "}
              {monster.alignmentDescription}
            </p>
            {monster.description && <Markdown>{monster.description}</Markdown>}
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
                <Translation id="speed" />
              </dt>
              <dd>{monsterSpeed(monster.monsterSpeed, l10n)}</dd>
              {monster.forms.length > 0 && (
                <>
                  <dt>
                    <Translation id="forms" />
                  </dt>
                  <dd>
                    {monster.forms.map((form, index) => (
                      <Fragment key={form["@id"]}>
                        <NavLink to={`/monsters/${btoa(form["@id"])}`}>
                          {form.label}
                        </NavLink>
                        {index !== monster.forms.length - 1 && <>, </>}
                      </Fragment>
                    ))}
                  </dd>
                </>
              )}
            </dl>
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
              {monster.damageVulnerabilities.length > 0 && (
                <>
                  <dt>
                    <Translation id="vulnerabilities" />
                  </dt>
                  <dd>{monster.damageVulnerabilities.join("; ")}</dd>
                </>
              )}
              {monster.damageResistances.length > 0 && (
                <>
                  <dt>
                    <Translation id="resistances" />
                  </dt>
                  <dd>{monster.damageResistances.join("; ")}</dd>
                </>
              )}
              {(monster.damageImmunities.length > 0 ||
                monster.conditionImmunities.length > 0) && (
                <>
                  <dt>
                    <Translation id="immunities" />
                  </dt>
                  <dd>
                    {[
                      ...monster.damageImmunities,
                      ...monster.conditionImmunities.map(
                        (condition) => condition.label,
                      ),
                    ].join("; ")}
                  </dd>
                </>
              )}
              {monster.senses && (
                <>
                  <dt>
                    <Translation id="senses" />
                  </dt>
                  <dd>{monsterSenses(monster.senses, l10n)}</dd>
                </>
              )}
              {monster.monsterLanguages && (
                <>
                  <dt>
                    <Translation id="languages" />
                  </dt>
                  <dd>{monster.monsterLanguages}</dd>
                </>
              )}
              <dt>
                <Translation id="challenge" />
              </dt>
              <dd>{monsterChallenge(monster)}</dd>
            </dl>
            {monster.specialAbilities.length > 0 && (
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
            {monster.monsterActions.length > 0 && (
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
            {monster.legendaryActions.length > 0 && (
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
            {monster.reactions.length > 0 && (
              <>
                <h3>
                  <Translation id="reactions" />
                </h3>
                <dl className="data-list">
                  {monster.reactions.map((action) => (
                    <Fragment key={action.label}>
                      <dt>{action.label}</dt>
                      <dd>{action.description}</dd>
                    </Fragment>
                  ))}
                </dl>
              </>
            )}
          </>
        )}
      </Content>
    </Layout>
  );
}
