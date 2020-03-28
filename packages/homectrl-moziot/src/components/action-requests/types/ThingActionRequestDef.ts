import { Observable } from "rxjs";

import { ThingActionRequestStatus } from "./ThingActionRequestStatus";

export interface ThingActionRequestDef {
  input: any;
  timeRequested: string;
  status: Observable<ThingActionRequestStatus>;
}
