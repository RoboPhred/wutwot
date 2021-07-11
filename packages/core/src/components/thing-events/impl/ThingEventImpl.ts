import { inspect } from "util";
import { cloneDeep } from "lodash";
import { DCMITermsIRIs } from "@wutwot/ld";
import {
  TypedDataSchema,
  W3cWotTdIRIs,
  W3CWotJsonSchemaContext,
  Form,
  W3cWotFormContext,
} from "@wutwot/w3c-td";

import {
  DeepImmutable,
  DeepImmutableArray,
  DeepImmutableObject,
  makeReadOnly,
  makeReadOnlyDeep,
} from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";

import { EventEventSink } from "../components";
import { ThingEventDef, ThingEvent, ThingEventRecord } from "../types";
import { Thing } from "../../things";
import { FormProvider } from "../../properties";
import { getEventForms } from "../../forms";
import { nonEmptyArray } from "../../../utils/types";
import { addContext, asID } from "../../../utils/json-ld";

export class ThingEventImpl implements ThingEvent {
  private _def: DeepImmutableObject<ThingEventDef>;

  /**
   * Event records sorted by date ascending.
   */
  private _records: ThingEventRecord[] = [];

  constructor(
    def: ThingEventDef,
    private _id: string,
    private _thing: Thing,
    private _owner: object,
    private _eventSink: EventEventSink,
    private _formProviders: FormProvider[],
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
    return this._thing.id;
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

  get forms(): DeepImmutableArray<Form> {
    return makeReadOnlyDeep(
      cloneDeep(getEventForms(this._formProviders, this._thing, this)),
    );
  }

  toJSON() {
    return {
      id: this.id,
      thingId: this.thingId,
      ownerPlugin: this.ownerPlugin,
      title: this.title,
      semanticTypes: cloneDeep(this.semanticTypes),
      description: this.description,
      data: cloneDeep(this.data),
      records: cloneDeep(this.records),
      forms: cloneDeep(this.forms),
    };
  }

  toJSONLD() {
    return {
      [W3cWotTdIRIs.Name]: this.id,
      "@type": this.semanticTypes,
      // [W3cRdfSyntaxIRIs.Type]: nonEmptyArray(
      //   this.semanticTypes.map(asID()),
      //   undefined,
      // ),
      [DCMITermsIRIs.Title]: this.title,
      [DCMITermsIRIs.Description]: this.description,
      [W3cWotTdIRIs.HasNotificationSchema]: {
        "@context": W3CWotJsonSchemaContext,
        ...cloneDeep(this.data),
      },
      [W3cWotTdIRIs.HasForm]: nonEmptyArray(
        this.forms.map(addContext(W3cWotFormContext)),
        undefined,
      ),
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
