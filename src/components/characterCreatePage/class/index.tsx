import Translation from "../../translation";
import React, { FormEventHandler, useState } from "react";
import useListOfType from "../../../hooks/useListOfType";
import { ClassShapeType } from "../../../ldo/dnd5e.shapeTypes";
import { type UseFormRegister } from "react-hook-form";
import { type Inputs } from "../index";
import CharacterCreatePageChoice from "../choice";

interface Props {
  register: UseFormRegister<Inputs>;
}

export default function CharacterCreatePageClass({ register }: Props) {
  const { items: classes, isLoading } = useListOfType(
    ClassShapeType,
    "classes",
    "Class",
  );

  const [classInfo, setClassInfo] = useState(classes?.[0]);

  const onChange: FormEventHandler<HTMLSelectElement> = async (event) => {
    const classInfo = classes.find(
      (c) => c["@id"] === (event.target as HTMLSelectElement).value,
    );
    setClassInfo(classInfo);
  };

  return (
    <>
      <label htmlFor="class" className="label">
        <Translation id="class" />
      </label>
      <select
        className="select"
        id="class"
        {...register("class", {
          required: true,
          disabled: isLoading,
          onChange,
        })}
      >
        {classes.map((classInfo) => (
          <option key={classInfo["@id"]} value={classInfo["@id"]}>
            {classInfo.label}
          </option>
        ))}
      </select>
      {classInfo.proficiencyChoices.map((choice) => (
        <CharacterCreatePageChoice key={choice["@id"]} choice={choice} />
      ))}
      {classInfo.startingEquipmentOptions.map((choice) => (
        <CharacterCreatePageChoice key={choice["@id"]} choice={choice} />
      ))}
    </>
  );
}
