import { Class } from "../../../ldo/dnd5e.typings";
import { useLocalization } from "@fluent/react";
import Translation from "../../translation";

interface Props {
  classInfo: Class;
}

export default function ClassPageMulticlassing({ classInfo }: Props) {
  const { l10n } = useLocalization();
  const requirement = [
    classInfo.multiclassing.prerequisites
      .map(
        (prerequisite) =>
          `${prerequisite.abilityScore.label} (${prerequisite.minimumScore})`,
      )
      .join(` ${l10n.getString("and")} `) || "",
    classInfo.multiclassing.prerequisiteChoice?.from.abilityScoreOptions
      .map((score) => `${score.abilityScore.label} (${score.minimumScore})`)
      .join(` ${l10n.getString("or")} `) || "",
  ].join("");
  return (
    <p className="notification">
      <Translation id="multiclassRequirement" vars={{ requirement }} />
    </p>
  );
}
