import { VehicleSpeed as VehicleSpeedData } from "../../download/api.types";
import { VehicleSpeed } from "../../sanity/schema-types";

function migrateObject(value: VehicleSpeedData): VehicleSpeed {
  return {
    _type: "vehicleSpeed",
    quantity: value.quantity,
    unit: value.unit,
  };
}

export default function migrateVehicleSpeed<T>(
  key: keyof T,
  value?: VehicleSpeedData
): Record<string, VehicleSpeed> {
  return value ? { [key]: migrateObject(value) } : {};
}
