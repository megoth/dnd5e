import React from "react";
import Content from "../content";
import { Background } from "../../ldo/dnd5e.typings";
import Loading from "../loading";

interface Props {
  background: Background;
  isLoading?: boolean;
}

export default function BackgroundInfo({ background, isLoading }: Props) {
  return (
    <Content>
      <h1>{background.label}</h1>
      {isLoading && <Loading />}
      {!isLoading && <>MORE TO COME</>}
    </Content>
  );
}
