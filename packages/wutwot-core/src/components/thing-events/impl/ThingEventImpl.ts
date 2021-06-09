import { inspect } from "util";
import { cloneDeep } from "lodash";
import {
  TypedDataSchema,
  DCMITermsIRIs,
  W3cWotTdIRIs,
  W3CWotJsonSchemaContext,
} from "@wutwot/td";

import {
  DeepImmutable,
  DeepImmutableObject,
  makeReadOnly,
  makeReadOnlyDeep,
} from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";

import { EventEventSink } from "../components";
import { ThingEventDef, ThingEvent, ThingEventRecord } from "../types";

export class ThingEventImpl implements ThingEvent {
  private _def: DeepImmutableObject<ThingEventDef>;

  /**
   * Event records sorted by date ascending.
   */
  private _records: ThingEventRecord[] = [];

  constructor(
    def: ThingEventDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
    private _eventSink: EventEventSink,
  ) {
    this._def = {
      ...makeReadOnlyDeep(cloneDeep(def)),
      eventSource: def.eventSource,
    };
    this._def.eventSource.subscribe(this._onEventRaised.bind(this));
  }

  [inspect.custom] = makeInspectJson("ThingEvent");

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get title(): string | undefined {
    return this._def.title;
  }

  get semanticTypes(): readonly string[] {
    let value: string[] = [];
    if (Array.isArray(this._def.semanticType)) {
      value = [...this._def.semanticType];
    } else if (typeof this._def.semanticType === "string") {
      value = [this._def.semanticType];
    }

    return makeReadOnly(value);
  }

  get description(): string | undefined {
    return this._def.description;
  }

  get data(): DeepImmutable<TypedDataSchema> | undefined {
    return this._def.data;
  }

  get records(): readonly ThingEventRecord[] {
    return makeReadOnly([...this._records]);
  }

  toJSON() {
    return {
      id: this.id,
      thingId: this.thingId,
      ownerPlugin: this.ownerPlugin,
      title: this.title,
      semanticTypes: this.semanticTypes,
      description: this.description,
      data: cloneDeep(this.data),
      records: this.records,
    };
  }

  toJSONLD() {
    return {
      [W3cWotTdIRIs.Name]: this.id,
      "@type": [...this.semanticTypes],
      [DCMITermsIRIs.Title]: this.title,
      [DCMITermsIRIs.Description]: this.description,
      [W3cWotTdIRIs.HasNotificationSchema]: {
        "@context": W3CWotJsonSchemaContext,
        ...cloneDeep(this.data),
      },
    };
  }

  private _onEventRaised(data: any) {
    const record: ThingEventRecord = makeReadOnlyDeep({
      data,
      timestamp: new Date().toISOString(),
    });

    // Don't need to sort, as we know this is going to be newer
    //  than anything in the array.
    this._records.push(record);

    this._eventSink.onEventRaised(this, record);
  }
}
