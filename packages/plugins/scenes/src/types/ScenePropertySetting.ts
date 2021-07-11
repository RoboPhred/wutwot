import { TypedDataSchema } from "@wutwot/w3c-td";

export interface ScenePropertySetting {
  thingId: string;
  propertyId: string;
  value: any;
}
export const scenePropertySettingDataSchema: TypedDataSchema = {
  type: "object",
  properties: {
    thingId: { type: "string" },
    propertyId: { type: "string" },
    // value can be anything
  },
  required: ["thingId", "propertyId", "value"],
};
