import { injectable, inject } from "microinject";

import {
  ActionSource,
  ThingActionDef,
  ThingActionRequestDef
} from "../../../contracts/ActionSource";

import { ActionAggregator } from "../ActionAggregator";
import { ThingContext } from "../../../contracts";

@injectable(ActionAggregator)
export class ActionAggregatorImpl implements ActionAggregator {
  readonly id: string = "aggregator";

  constructor(
    @inject(ActionSource, { all: true }) private _actionSources: ActionSource[]
  ) {}

  getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef> {
    const actions: ThingActionDef[] = [];
    for (const source of this._actionSources) {
      const sourceActions = source
        .getThingActions(thingContext)
        .map(x => scopeAction(source, x));
      actions.push(...sourceActions);
    }

    Object.freeze(actions);
    return actions;
  }

  getThingActionRequests(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionRequestDef> {
    const invocations: ThingActionRequestDef[] = [];
    for (const source of this._actionSources) {
      const sourceInvocations = source
        .getThingActionRequests(thingContext)
        .map(x => scopeInvocation(source, x));
      invocations.push(...sourceInvocations);
    }

    Object.freeze(invocations);
    return invocations;
  }

  requestAction(
    thingContext: ThingContext,
    actionId: string,
    input: any
  ): ThingActionRequestDef {
    const ids = unscopeId(actionId);
    if (!ids.id || !ids.sourceId) {
      throw new Error(
        `Unknown action id "${actionId}" for thing "${thingContext.thingId}".`
      );
    }

    const source = this._actionSources.find(x => x.id === ids.sourceId);
    if (!source) {
      throw new Error(
        `Unknown action id "${actionId}" for thing "${thingContext}".`
      );
    }

    const invocation = source.requestAction(thingContext, ids.id, input);
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
    actionId: scopeId(source, action.actionId)
  };
}

function scopeInvocation(
  source: ActionSource,
  invocation: ThingActionRequestDef
): ThingActionRequestDef {
  return {
    ...invocation,
    requestId: scopeId(source, invocation.requestId),
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
