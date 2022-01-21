import { getClient } from "../sanity";

export interface EquipmentQuery {
  name: string;
  slug: string;
  cost: string;
  costUnit: string;
}

export async function getAllEquipment(preview: boolean) {
  return getClient(preview).fetch(`*[_type == "equipment"]{
      'name': name_en_US,
      'slug': slug.current,
      'cost': cost.quantity,
      'costUnit': cost.unit,
    }|order(name asc)`);
}
