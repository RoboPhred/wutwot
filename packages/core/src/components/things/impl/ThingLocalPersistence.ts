import { injectable, provides, inject, injectParam } from "microinject";

import {
  ScopedDataPersistence,
  Database,
  DataPersistenceKey,
} from "../../persistence";

import { ThingLocalPersistence } from "../components";
import { InternalThingParams } from "../services";

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

  protected get dataKey(): DataPersistenceKey {
    return ["things", this._thingId];
  }
}
