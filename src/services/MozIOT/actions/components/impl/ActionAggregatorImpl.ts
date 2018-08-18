import { injectable, inject } from "microinject";

import { ThingContext } from "../../../things";

import {
  ActionSource,
  ThingActionRequestDef,
  ThingActionContext,
  ThingActionRequestContext,
  ThingActionDef
} from "../../contracts";

import { ActionAggregator } from "../ActionAggregator";

@injectable(ActionAggregator)
export class ActionAggregatorImpl implements ActionAggregator {
  private _actionSources = new Map<string, ActionSource>();

  constructor(
    @inject(ActionSource, { all: true }) actionSources: ActionSource[]
  ) {
    for (const source of actionSources) {
      // TODO: Could skip source IDs and auto-prefix where needed.
      if (this._actionSources.has(source.id)) {
        throw new Error(`Duplicate source ID ${source.id}.`);
      }
      this._actionSources.set(source.id, source);
    }
  }

  getThingActions(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionContext> {
    const actions: ThingActionContext[] = [];
    for (const source of this._actionSources.values()) {
      const sourceActions = source
        .getThingActions(thingContext)
        .map(actionDef => this._actionToContext(source, actionDef));

      actions.push(...sourceActions);
    }

    Object.freeze(actions);
    return actions;
  }

  getThingActionRequests(
    thingContext: ThingContext
  ): ReadonlyArray<ThingActionRequestContext> {
    const contexts: ThingActionRequestContext[] = [];
    for (const source of this._actionSources.values()) {
      const sourceInvocations = source
        .getThingActionRequests(thingContext)
        .map(request => {
          const context = this._requestToContext(source, request);
          return context;
        });
      contexts.push(...sourceInvocations);
    }

    Object.freeze(contexts);
    return contexts;
  }

  requestAction(
    actionContext: ThingActionContext,
    input: any
  ): ThingActionRequestContext {
    const { actionId, actionSourceId } = actionContext;

    const source = this._actionSources.get(actionSourceId);
    if (!source) {
      throw new Error(
        `Unknown action source id "${actionId}" for context "${JSON.stringify(
          actionContext
        )}".`
      );
    }

    const request = source.requestAction(actionContext, input);
    const context = this._requestToContext(source, request);
    return context;
  }

  cancelRequest(requestContext: ThingActionRequestContext): boolean {
    const { actionSourceId } = requestContext;
    const source = this._actionSources.get(actionSourceId);
    if (!source) {
      throw new Error(
        `Unknown action id "${actionSourceId}" in request ${JSON.stringify(
          requestContext
        )}.`
      );
    }

    return source.cancelRequest(requestContext);
  }

  private _actionToContext(
    source: ActionSource,
    actionDef: ThingActionDef
  ): ThingActionContext {
    const context: ThingActionContext = {
      ...actionDef,
      actionSourceId: source.id,
      actionSourceActionId: actionDef.actionId,
      actionId: `${source.id}--${actionDef.actionId}`
    };
    return context;
  }

  private _requestToContext(
    source: ActionSource,
    request: ThingActionRequestDef
  ): ThingActionRequestContext {
    const context: ThingActionRequestContext = {
      ...request,
      requestId: `${source.id}--${request.requestId}`,
      actionSourceId: source.id,
      actionSourceActionId: `${source.id}--${request.actionId}`,
      actionSourceRequestId: request.requestId
    };
    return context;
  }
}
