import { DataPersistence } from "@wutwot/core";

const PersistenceKey_Name = ["name"];
const PersistenceKey_Location = ["location"];

export class ThingModelPersistence {
  constructor(private _pluginLocalThingPersistence: DataPersistence) {}

  getName(): string {
    return this._pluginLocalThingPersistence.get(PersistenceKey_Name) ?? "";
  }

  setName(value: string) {
    this._pluginLocalThingPersistence.set(PersistenceKey_Name, value);
  }

  getLocation(): string {
    return this._pluginLocalThingPersistence.get(PersistenceKey_Location) ?? "";
  }

  setLocation(value: string) {
    this._pluginLocalThingPersistence.set(PersistenceKey_Location, value);
  }
}
