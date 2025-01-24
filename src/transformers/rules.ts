import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { RuleSectionShapeType, RuleShapeType } from "../ldo/dnd5e.shapeTypes";
import { Rule } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import rules from "../dnd5eapi-data/5e-SRD-Rules.json";

export function transformRule(
  data: components["schemas"]["Rule"],
  ldoDataset = createLdoDataset(),
): Rule {
  const rule = ldoDataset
    .usingType(RuleShapeType)
    .fromSubject(`#${data.index}`);
  rule.type = { "@id": "Rule" };
  rule.label = data.name;
  rule.description = data.desc;
  rule.ruleSections = data.subsections.map((section) =>
    ldoDataset
      .usingType(RuleSectionShapeType)
      .fromSubject(apiUrlToSubjectUrl(section.url)),
  );
  return rule;
}

export default async function writeRules(): Promise<void> {
  const turtle = (
    await Promise.all(rules.map((rule) => toTurtle(transformRule(rule))))
  ).reduce((memo, rules) => memo.concat(rules));
  writeFileSync(dataPath("rules"), turtle);
}
