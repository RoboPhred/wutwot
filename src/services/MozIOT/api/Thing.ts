import { ReadonlyRecord } from "../../../types";

import { ThingAction } from "./ThingAction";

export interface Thing {
  readonly id: string;
  name: string;
  readonly types: ReadonlyArray<string>;
  readonly description: string;

  readonly actions: ReadonlyRecord<string, ThingAction>;
}
