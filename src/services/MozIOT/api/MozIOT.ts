import { ReadonlyRecord } from "../../../types";

import { Thing } from "./Thing";

export interface MozIOT {
  things: ReadonlyRecord<string, Thing>;
}
