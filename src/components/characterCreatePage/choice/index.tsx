import React from "react";
import { Choice } from "../../../ldo/dnd5e.typings";
import useRulesBundle from "../../../hooks/useRulesBundle";
import CharacterCreatePageStartingOptionsReferences from "./references";

interface Props {
  choice?: Choice;
}

export default function CharacterCreatePageChoice({ choice }: Props) {
  const { isLoading } = useRulesBundle("proficiencies");

  return (
    !isLoading &&
    choice?.from?.references && (
      <CharacterCreatePageStartingOptionsReferences options={choice} />
    )
  );
}
