import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { ClassLevelShapeType, ClassShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Class } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import transformMulticlassing from "./multiclassings";

function transformClass(
  data: components["schemas"]["Class"],
  ldoDataset = createLdoDataset(),
): Class {
  const adventureClass = ldoDataset
    .usingType(ClassShapeType)
    .fromSubject(`#${data.index}`);
  adventureClass.type = type("Class");
  adventureClass.label = data.name;
  adventureClass.hitDie = data.hit_die;
  adventureClass.levels = new Array(20).map((_, index) =>
    ldoDataset
      .usingType(ClassLevelShapeType)
      .fromSubject(dataUrl("classLevels", `${data.index}-${index}`)),
  );
  adventureClass.multiclassing = transformMulticlassing(
    data.multi_classing,
    ldoDataset,
  );
  return adventureClass;
}

export default async function writeClasses(
  data: Array<components["schemas"]["Class"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((adventureClass) => toTurtle(transformClass(adventureClass))),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(dataPath("classes"), turtle);
}
