import React from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "../loading";

interface Props {
  equipment: Equipment;
  isLoading?: boolean;
}

export default function MagicItemInfo({ equipment, isLoading }: Props) {
  return (
    <Content>
      <h1>{equipment.label}</h1>
      {isLoading && <Loading />}
      {!isLoading && (
        <p className="notification">{equipment.equipmentCategory.label}</p>
      )}
      {!isLoading && equipment.description && (
        <Markdown remarkPlugins={[remarkGfm]}>{equipment.description}</Markdown>
      )}
    </Content>
  );
}
