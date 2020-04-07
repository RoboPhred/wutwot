import { injectable, provides, inject, injectParam } from "microinject";

import {
  ScopedDataPersistence,
  Database,
  DataStorageKey,
} from "../../persistence";

import { ThingLocalPersistence, InternalThingParams } from "../services";

import { inThingScope } from "../scopes";

@injectable()
@provides(ThingLocalPersistence)
@inThingScope()
export class ThingLocalPersistenceImpl extends ScopedDataPersistence {
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(Database) database: Database,
  ) {
    super(database);
  }

  protected get dataKey(): DataStorageKey {
    return ["things", this._thingId];
  }
}
