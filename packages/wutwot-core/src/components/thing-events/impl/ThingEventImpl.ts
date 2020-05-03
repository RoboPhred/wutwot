import { inspect } from "util";
import { cloneDeep } from "lodash";
import { TypedDataSchema } from "@wutwot/td";

import {
  DeepImmutable,
  makeReadOnly,
  makeReadOnlyDeep,
} from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";
import { DCMITermsTerms, W3cWotTDTerms, JsonSchemaContext } from "@wutwot/td";

import { EventEventSink } from "../components";
import { ThingEventDef, ThingEvent, ThingEventRecord } from "../types";

export class ThingEventImpl implements ThingEvent {
  private _data: DeepImmutable<TypedDataSchema> | undefined = undefined;

  /**
   * Event records sorted by date ascending.
   */
  private _records: ThingEventRecord[] = [];

  constructor(
    private _def: ThingEventDef,
    private _id: string,
    private _thingId: string,
    private _owner: object,
    private _eventSink: EventEventSink,
  ) {
    _def.eventSource.subscribe(this._onEventRaised.bind(this));
    if (_def.data) {
      this._data = makeReadOnlyDeep(cloneDeep(_def.data));
    }
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
    return this._data;
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
      "@index": this.id,
      "@type": [...this.semanticTypes],
      [DCMITermsTerms.Title]: this.title,
      [DCMITermsTerms.Description]: this.description,
      [W3cWotTDTerms.HasNotificationSchema]: {
        "@context": {
          "@vocab": JsonSchemaContext,
        },
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
