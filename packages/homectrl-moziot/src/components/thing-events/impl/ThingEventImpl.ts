import { makeReadOnly, makeReadOnlyDeep } from "../../../utils/readonly";

import { ThingEventDef, ThingEvent, ThingEventRecord } from "../types";

export class ThingEventImpl implements ThingEvent {
  /**
   * Event records sorted by date ascending.
   */
  private _records: ThingEventRecord[] = [];

  constructor(
    private _def: ThingEventDef,
    private _id: string,
    private _thingId: string,
    private _owner: object
  ) {
    _def.eventSource.subscribe(this._onEventRaised.bind(this));
  }

  get id(): string {
    return this._id;
  }

  get thingId(): string {
    return this._thingId;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get title(): string {
    return this._def.title;
  }

  get semanticType(): string {
    return this._def.semanticType;
  }

  get description(): string {
    return this._def.description;
  }

  get type(): string {
    return this._def.type;
  }

  get unit(): string | undefined {
    return this._def.unit;
  }

  get minimum(): number | undefined {
    return this._def.minimum;
  }

  get maximum(): number | undefined {
    return this._def.maximum;
  }

  get multipleOf(): number | undefined {
    return this._def.multipleOf;
  }

  get records(): readonly ThingEventRecord[] {
    return makeReadOnly([...this._records]);
  }

  private _onEventRaised(data: any) {
    // Don't need to sort, as we know this is going to be newer
    //  than anything in the array.
    this._records.push({
      data: makeReadOnlyDeep(data),
      timestamp: new Date().toISOString()
    });
  }
}
