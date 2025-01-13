import { Class } from "../../../ldo/dnd5e.typings";
import Translation from "../../translation";
import React from "react";

interface Props {
  classInfo: Class;
}

export default function ClassPageHitPoints({ classInfo }: Props) {
  return (
    <article>
      <h3>
        <Translation id="hitPoints" />
      </h3>
      <dl className="data-list">
        <dt>
          <Translation id="hitDie" />
        </dt>
        <dd>
          <Translation
            id="hitDiePerLevel"
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
    </article>
  );
}
