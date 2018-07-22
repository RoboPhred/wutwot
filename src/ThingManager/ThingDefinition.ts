export interface ThingDef {
  name: string;
  type: string;
  description: string;
  properties: Record<string, ThingPropertyDef>;
  events: Record<string, ThingEventDef>;
  actions: Record<string, ThingActionDef>;
}

export interface ThingPropertyDef {
  label: string;
  type: string;
  description: string;
  href: string;
}

export interface NumericThingPropertyDef extends ThingPropertyDef {
  type: "number";
  unit?: string;
  minimum?: number;
  maximum?: number;
}

export interface ObjectThingPropertyDef extends ThingPropertyDef {
  type: "object";
  properties: Record<string, ThingPropertyDef>;
}

export interface ThingActionDef {
  label: string;
  description: string;
  href: string;
}

export interface ThingEventDef {
  type: string;
  unit: string;
  description: string;
  href: string;
}
