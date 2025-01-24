import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { RuleSectionShapeType } from "../ldo/dnd5e.shapeTypes";
import { RuleSection } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { dataPath } from "../utils/dnd5e";
import sections from "../dnd5eapi-data/5e-SRD-Rule-Sections.json";

export function transformRuleSection(
  data: components["schemas"]["RuleSection"],
  ldoDataset = createLdoDataset(),
): RuleSection {
  const section = ldoDataset
    .usingType(RuleSectionShapeType)
    .fromSubject(`#${data.index}`);
  section.type = { "@id": "RuleSection" };
  section.label = data.name;
  section.description = data.desc;
  return section;
}

export default async function writeRuleSections(): Promise<void> {
  const turtle = (
    await Promise.all(
      sections.map((section) => toTurtle(transformRuleSection(section))),
    )
  ).reduce((memo, sections) => memo.concat(sections));
  writeFileSync(dataPath("rule-sections"), turtle);
}
