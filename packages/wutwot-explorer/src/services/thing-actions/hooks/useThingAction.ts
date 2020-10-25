import * as React from "react";

import { useAppSelector } from "@/store/selectors";
import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";
import { invokeThingAction } from "../api";

export interface UseThingAction {
  invokeAction(input: any): void;
  isInvoking: boolean;
  lastInvocationResult: any;
  lastInvocationErrorMessage: string | null;
}

export function useThingAction(
  thingDisplayId: string,
  actionKey: string,
): UseThingAction {
  // Details about the thing we are handling values for.
  const {
    definition: thingDefinition,
    sourceId: thingSourceId,
  } = useAppSelector((state) => thingDataSelector(state, thingDisplayId)) ?? {
    definition: null,
    sourceId: null,
  };

  // The url the thing was sourced from.
  //  Needed as a fallback if the thing does not specify a base url.
  const thingSourceUrl = useAppSelector((state) =>
    thingSourceUrlSelector(state, thingSourceId),
  );

  const [isInvoking, setIsInvoking] = React.useState(false);
  const [lastInvocationResult, setLastInvocationResult] = React.useState<any>(
    undefined,
  );
  const [
    lastInvocationErrorMessage,
    setLastInvocationErrorMessage,
  ] = React.useState<string | null>(null);

  const invokeAction = React.useCallback(
    (input: any) => {
      async function doInvoke() {
        if (!thingDefinition || !thingSourceUrl) {
          return;
        }

        setIsInvoking(true);
        setLastInvocationResult(undefined);
        setLastInvocationErrorMessage(null);

        try {
          const result = await invokeThingAction(
            thingDefinition,
            thingSourceUrl,
            actionKey,
            input,
          );
          setLastInvocationResult(result);
        } catch (e) {
          setLastInvocationErrorMessage(e.message);
        } finally {
          setIsInvoking(false);
        }
      }

      doInvoke();
    },
    [thingDefinition, thingSourceUrl],
  );

  return {
    invokeAction,
    isInvoking,
    lastInvocationResult,
    lastInvocationErrorMessage,
  };
}
