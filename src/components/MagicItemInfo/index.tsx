import React from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import { description } from "../../utils/dnd5e";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  equipment: Equipment;
}

export default function MagicItemInfo({ equipment }: Props) {
  return (
    <Content>
      <h1>{equipment.label}</h1>
      <p className="notification">{equipment.equipmentCategory.label}</p>
      {equipment.description && (
        <Markdown remarkPlugins={[remarkGfm]}>
          {description(equipment.description)}
        </Markdown>
      )}
    </Content>
  );
}
