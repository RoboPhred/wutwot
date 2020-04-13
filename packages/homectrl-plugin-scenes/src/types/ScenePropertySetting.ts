import { DataSchema } from "homectrl-moziot/lib/components/data-schema";

export interface ScenePropertySetting {
  thingId: string;
  propertyId: string;
  value: any;
}
export const scenePropertySettingDataSchema: DataSchema = {
  type: "object",
  properties: {
    thingId: { type: "string" },
    propertyId: { type: "string" },
    // value can be anything
  },
  required: ["thingId", "propertyId", "value"],
};
