import { JSONSchema6 } from "json-schema";
import { Observable } from "rxjs";

import { DeepImmutableObject } from "../../types";

import { ThingActionRequestStatus } from "../../action-requests";

export interface ThingActionDef {
  readonly title: string;
  readonly semanticType?: string;
  readonly description: string;
  readonly input: DeepImmutableObject<JSONSchema6>;
  onActionInvocationRequested(
    thingId: string,
    actionId: string,
    input: any
  ): Observable<ThingActionRequestStatus>;
}
