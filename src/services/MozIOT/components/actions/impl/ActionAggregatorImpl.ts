import { injectable, inject } from "microinject";

import {
  ActionSource,
  ThingActionDef,
  ThingActionInvocation
} from "../../../contracts/ActionSource";

import { ActionAggregator } from "../ActionAggregator";

@injectable(ActionAggregator)
export class ActionAggregatorImpl implements ActionAggregator {
  readonly id: string = "aggregator";

  constructor(
    @inject(ActionSource, { all: true })
    private _actionSources: ActionSource[]
  ) {}

  getThingActions(thingId: string): ReadonlyArray<ThingActionDef> {
    const actions: ThingActionDef[] = [];
    for (const source of this._actionSources) {
      const sourceActions = source
        .getThingActions(thingId)
        .map(x => scopeAction(source, x));
      actions.push(...sourceActions);
    }

    Object.freeze(actions);
    return actions;
  }

  getThingInvocations(thingId: string): ReadonlyArray<ThingActionInvocation> {
    const invocations: ThingActionInvocation[] = [];
    for (const source of this._actionSources) {
      const sourceInvocations = source
        .getThingInvocations(thingId)
        .map(x => scopeInvocation(source, x));
      invocations.push(...sourceInvocations);
    }

    Object.freeze(invocations);
    return invocations;
  }

  invokeAction(
    thingId: string,
    actionId: string,
    input: any
  ): ThingActionInvocation {
    const ids = unscopeId(actionId);
    if (!ids.id || !ids.sourceId) {
      throw new Error(
        `Unknown action id "${actionId}" for thing "${thingId}".`
      );
    }

    const source = this._actionSources.find(x => x.id === ids.sourceId);
    if (!source) {
      throw new Error(
        `Unknown action id "${actionId}" for thing "${thingId}".`
      );
    }

    const invocation = source.invokeAction(thingId, ids.id, input);
    const scopedInvocation = scopeInvocation(source, invocation);
    return scopedInvocation;
  }

  cancelInvocation(invocationId: string): boolean {
    const ids = unscopeId(invocationId);
    if (!ids.id || !ids.sourceId) {
      throw new Error(`Unknown invocation id "${invocationId}".`);
    }

    const source = this._actionSources.find(x => x.id === ids.sourceId);
    if (!source) {
      throw new Error(`Unknown invocation id "${invocationId}".`);
    }

    return source.cancelInvocation(ids.id);
  }
}

function scopeAction(
  source: ActionSource,
  action: ThingActionDef
): ThingActionDef {
  return {
    ...action,
    id: scopeId(source, action.id)
  };
}

function scopeInvocation(
  source: ActionSource,
  invocation: ThingActionInvocation
): ThingActionInvocation {
  return {
    ...invocation,
    id: scopeId(source, invocation.id),
    actionId: scopeId(source, invocation.actionId)
  };
}

function scopeId(source: ActionSource, id: string): string {
  return `${source.id}::${id}`;
}

function unscopeId(id: string): { sourceId: string; id: string } {
  const parts = id.split("::");
  return {
    sourceId: parts[0],
    id: parts.slice(1).join("::")
  };
}
