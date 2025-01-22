import { type UseFormRegister } from "react-hook-form";
import { Inputs } from "../index";
import Translation from "../../translation";
import React from "react";

interface Props {
  register: UseFormRegister<Inputs>;
}

export default function CharacterCreatePageName({ register }: Props) {
  return (
    <>
      <label htmlFor="name" className="label">
        <Translation id="name" />
      </label>
      <input
        className="input"
        id="name"
        type="text"
        {...register("name", { required: true })}
      />
    </>
  );
}
