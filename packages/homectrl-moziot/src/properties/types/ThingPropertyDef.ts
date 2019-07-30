import { Observable } from "rxjs";

import { ThingPropertyType } from "./ThingProperty";

export interface ThingPropertyDef {
  title: string;
  semanticType?: string;
  description: string;
  type: ThingPropertyType;
  unit?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
  readOnly?: boolean;

  initialValue: any;

  values: Observable<any>;

  onValueChangeRequested(thingId: string, propertyId: string, value: any): void;
}

// TODO: Validator.  Validate in factory.
