import React from "react";
import { Choice } from "../../../ldo/dnd5e.typings";
import useRulesBundle from "../../../hooks/useRulesBundle";
import CharacterFormChoiceReferences from "./references";

interface Props {
  choice?: Choice;
}

export default function CharacterFormChoice({ choice }: Props) {
  const { isLoading } = useRulesBundle("proficiencies");

  return (
    !isLoading &&
    choice?.from?.references && (
      <CharacterFormChoiceReferences options={choice} />
    )
  );
}
