import Translation from "../../translation";
import React, { FormEventHandler, useEffect, useState } from "react";
import useListOfType from "../../../hooks/useListOfType";
import { ClassShapeType } from "../../../ldo/dnd5e.shapeTypes";
import { type UseFormRegister } from "react-hook-form";
import { type Inputs } from "../index";
import CharacterFormChoice from "../choice";

interface Props {
  register: UseFormRegister<Inputs>;
}

export default function CharacterCreatePageClass({ register }: Props) {
  const { items: classes, isLoading } = useListOfType(
    ClassShapeType,
    "characters",
    "Class",
  );

  const [classInfo, setClassInfo] = useState(classes?.[0]);
  useEffect(() => setClassInfo(classes?.[0]), [classes]);

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
          <option
            key={`classChoice-${classInfo["@id"]}`}
            value={classInfo["@id"]}
          >
            {classInfo.label}
          </option>
        ))}
      </select>
      {classInfo?.proficiencyChoices.map((choice, index) => (
        <CharacterFormChoice
          key={`proficiencyChoice-${index}`}
          choice={choice}
        />
      ))}
      {classInfo?.startingEquipmentOptions.map((choice, index) => (
        <CharacterFormChoice
          key={`startingEquipmentChoice-${index}`}
          choice={choice}
        />
      ))}
    </>
  );
}
