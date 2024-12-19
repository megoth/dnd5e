import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AlignmentShapeType } from "../ldo/dnd5e.shapeTypes";
import { Alignment } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";

export function transformAlignment(
  data: components["schemas"]["Alignment"],
  datasetUrl: string,
): Alignment {
  const alignment = createLdoDataset()
    .usingType(AlignmentShapeType)
    .fromSubject(datasetUrl + data.index);
  alignment.label = data.name;
  alignment.abbreviation = data.abbreviation;
  alignment.description = data.desc;
  return alignment;
}

export default async function transformAlignments(
  data: Array<components["schemas"]["Alignment"]>,
  datasetPath: string,
  datasetUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((alignmentData) =>
        toTurtle(transformAlignment(alignmentData, datasetUrl)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
