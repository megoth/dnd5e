import React from "react";
import EquipmentPage from "../../components/equipmentPage";
import { EquipmentQuery, getAllEquipment } from "../../lib/api/equipment";

interface Props {
  equipment?: Array<EquipmentQuery>;
}

export default function Equipment({ equipment }: Props) {
  return <EquipmentPage equipment={equipment} />;
}

Equipment.defaultProps = {
  equipment: [],
};

export async function getStaticProps({ preview = false }) {
  const equipment = await getAllEquipment(preview);
  return {
    props: { equipment },
    revalidate: 1,
  };
}
