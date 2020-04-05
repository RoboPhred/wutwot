import { injectable, provides, singleton, inject } from "microinject";

import { IdMapperImpl } from "../../id-mapping";
import { Database } from "../../persistence";

import { ThingIdMapper } from "../components";

@injectable()
@singleton()
@provides(ThingIdMapper)
export class ThingIdMapperImpl extends IdMapperImpl {
  constructor(@inject(Database) database: Database) {
    super(["thing-ids"], database);
  }
}
