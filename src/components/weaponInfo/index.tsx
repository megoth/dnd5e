import React, { Fragment } from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import Translation from "../translation";
import { cost, damage, description, weight } from "../../utils/dnd5e";
import Markdown from "react-markdown";

interface Props {
  equipment: Equipment;
}

export default function WeaponInfo({ equipment }: Props) {
  return (
    <Content>
      <h1>{equipment.label}</h1>
      <p className="notification">
        {equipment.equipmentCategory.label}
        <br />
        {equipment.weapon.weaponCategory} {equipment.weapon.weaponRange}
      </p>
      {equipment.description && (
        <Markdown>{description(equipment.description)}</Markdown>
      )}
      <dl className="data-list">
        {equipment.weapon.damage && (
          <>
            <dt>
              <Translation id="damage" />
            </dt>
            <dd>
              {damage(equipment.weapon.damage)}
              {equipment.weapon.twoHandedDamage &&
                ` (${damage(equipment.weapon.twoHandedDamage)})`}
            </dd>
          </>
        )}
        {equipment.weapon.range && (
          <>
            <dt>
              <Translation id="range" />
            </dt>
            <dd>
              {equipment.weapon.range.normal}/{equipment.weapon.range.long} ft.
            </dd>
          </>
        )}
        {equipment.weapon.properties.map((property) => (
          <Fragment key={property["@id"]}>
            <dt>{property.label}</dt>
            <dd>{property.description}</dd>
          </Fragment>
        ))}
        <dt>
          <Translation id="cost" />
        </dt>
        <dd>{cost(equipment.cost)}</dd>
        <dt>
          <Translation id="weight" />
        </dt>
        <dd>{weight(equipment.weapon.weight)}</dd>
      </dl>
    </Content>
  );
}
