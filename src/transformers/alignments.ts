import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AlignmentShapeType } from "../ldo/dnd5e.shapeTypes";
import { Alignment } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { dataPath } from "../utils/dnd5e";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";

function transformAlignment(
  data: components["schemas"]["Alignment"],
  ldoDataset = createLdoDataset(),
): Alignment {
  const alignment = ldoDataset
    .usingType(AlignmentShapeType)
    .fromSubject(`#${data.index}`);
  alignment.type = { "@id": "Alignment" };
  alignment.label = data.name;
  alignment.abbreviation = data.abbreviation;
  alignment.description = [data.desc];
  return alignment;
}

export default async function writeAlignments() {
  const turtle = (
    await Promise.all(
      alignments.map((alignmentData) =>
        toTurtle(transformAlignment(alignmentData)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(dataPath("alignments"), turtle);
}
