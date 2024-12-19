import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AlignmentShapeType } from "../ldo/dnd5e.shapeTypes";
import { Alignment } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";

const datasetUrl = "https://dnd5e.app/data/alignments.ttl#";
const datasetPath = "/public/data/alignments.ttl";

export function transformAlignment(
  data: components["schemas"]["Alignment"],
): Alignment {
  const ldoDataset = createLdoDataset();
  const alignment = ldoDataset
    .usingType(AlignmentShapeType)
    .fromSubject(datasetUrl + data.index);
  alignment.label = data.name;
  alignment.abbreviation = data.abbreviation;
  alignment.description = data.desc;
  return alignment;
}

export default async function transformAlignments(
  data: Array<components["schemas"]["Alignment"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((alignmentData) => toTurtle(transformAlignment(alignmentData))),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
