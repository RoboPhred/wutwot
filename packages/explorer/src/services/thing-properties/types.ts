export interface ThingPropertyObservation {
  value: any;
  timestamp: number;
  errorMessage: string | null;
}

export interface ReceivedThingPropertyObservation
  extends ThingPropertyObservation {
  thingDisplayId: string;
  propertyKey: string;
}

export interface ThingAndPropertyId {
  thingDisplayId: string;
  propertyKey: string;
}
