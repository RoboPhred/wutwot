import { Observable } from "rxjs";

export interface ThingEventDef {
  title: string;
  semanticType: string;
  description: string;
  type: string;
  unit?: string;
  minimum?: number;
  maximum?: number;
  multipleOf?: number;

  eventSource: Observable<any>;
}
