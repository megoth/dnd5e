import { VehicleSpeed as VehicleSpeedData } from "../../download/api.types";
import { VehicleSpeed } from "../../sanity/schema-types";

export default function migrateVehicleSpeed<T>(
  key: keyof T,
  value?: VehicleSpeedData
): {} | Record<keyof T, VehicleSpeed> {
  return value
    ? {
        [key]: {
          _type: "vehicleSpeed",
          quantity: value.quantity,
          unit: value.unit,
        },
      }
    : {};
}
