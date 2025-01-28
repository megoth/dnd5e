import { type UseFormRegister } from "react-hook-form";
import { Inputs } from "../index";
import Translation from "../../translation";
import React from "react";

interface Props {
  name?: string;
  register: UseFormRegister<Inputs>;
}

export default function CharacterFormName({ name, register }: Props) {
  return (
    <>
      <label htmlFor="name" className="label">
        <Translation id="name" />
      </label>
      <input
        className="input"
        id="name"
        type="text"
        defaultValue={name}
        {...register("name", { required: true })}
      />
    </>
  );
}
