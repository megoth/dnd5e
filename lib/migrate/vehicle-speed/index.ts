import { VehicleSpeedData } from "../../download/api.types";
import { VehicleSpeed } from "../../sanity/schema-types";

export default function migrateVehicleSpeed(
  value: VehicleSpeedData
): VehicleSpeed {
  return {
    _type: "vehicleSpeed",
    quantity: value.quantity,
    unit: value.unit,
  };
}
