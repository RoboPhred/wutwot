import { injectable, inject } from "microinject";

import { ThingAggregator } from "../ThingAggregator";
import { ThingSource, ThingDef } from "../../../contracts";

@injectable(ThingAggregator)
export class ThingAggregatorImpl implements ThingAggregator {
  readonly id: string = "aggregator";

  constructor(
    @inject(ThingSource, { all: true })
    private _thingSources: ThingSource[]
  ) {}

  get things(): ReadonlyArray<ThingDef> {
    const things: ThingDef[] = [];
    for (const source of this._thingSources) {
      const sourceThings = source.things.map(x => scopeThing(source, x));
      things.push(...sourceThings);
    }

    Object.freeze(things);
    return things;
  }
}

function scopeThing(source: ThingSource, thing: ThingDef): ThingDef {
  return {
    ...thing,
    id: scopeId(source, thing.id)
  };
}

function scopeId(source: ThingSource, id: string): string {
  return `${source.id}::${id}`;
}

function unscopeId(id: string): { sourceId: string; id: string } {
  const parts = id.split("::");
  return {
    sourceId: parts[0],
    id: parts.slice(1).join("::")
  };
}
