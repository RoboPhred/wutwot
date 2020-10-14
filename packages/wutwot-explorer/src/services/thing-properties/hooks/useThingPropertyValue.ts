import * as React from "react";
import isEqual from "lodash/isEqual";

import { useAppSelector } from "@/store/selectors";

import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { getThingPropertyValue, setThingPropertyValue } from "../api";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";
import { useIntervalAsync } from "@/hooks/useIntervalAsync";

export interface UsePropertyValue {
  refresh(): void;
  setValue(value: any): void;
  isRefreshing: boolean;
  value: any;
  errorMessage: string | null;
}

/**
 * The time to wait between refreshing to check if our value has been written.
 */
const SYNC_WRITE_DELAY = 800;

/**
 * The maximum time to keep checking if our value has been written.
 */
const SYNC_WRITE_MAX = 15000;

/**
 * A value to indicate we are not currently awaiting a write value.
 */
const NOT_AWAITING_VALUE = Symbol("NOT_AWAITING_VALUE");

export function useThingPropertyValue(
  thingDisplayId: string,
  propertyKey: string,
): UsePropertyValue {
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

  // Counter to trigger refreshes when the consumer calls the refresh() function.
  const [refreshCounter, setRefreshCounter] = React.useState(0);

  // Boolean indicating if we are currently in a read operation.
  const [isReading, setReading] = React.useState(false);

  // Function to read the data.  Used for polling and standard refreshes.
  async function loadData() {
    setReading(true);
    setErrorMessage(null);
    try {
      if (!thingDefinition || !thingSourceUrl) {
        throw new Error("Property not found.");
      }
      const value = await getThingPropertyValue(
        thingDefinition,
        thingSourceUrl,
        propertyKey,
      );
      valueReceived(value);
      setErrorMessage(null);
      return value;
    } catch (e) {
      setErrorMessage(e.message);
      throw e;
    } finally {
      setReading(false);
    }
  }

  // Boolean indicating if we are in a write operation.
  const [isWriting, setWriting] = React.useState(false);
  // The timestamp when we last wrote a value.  Used to poll the value after write.
  const lastWriteCompleteTimeRef = React.useRef<number>(0);
  // The value we have just written, and which we are waiting for a read to return.  Used to poll the value after write.
  const [awaitingWriteValue, setAwaitingWriteValue] = React.useState<any>(
    NOT_AWAITING_VALUE,
  );
  // Whether we are currently awaiting a value to be successfully written.
  const isAwaitingWriteValue = awaitingWriteValue != NOT_AWAITING_VALUE;

  // If we are awaiting the new write value to be received, keep polling
  useIntervalAsync(
    async () => {
      function stopPolling() {
        setAwaitingWriteValue(NOT_AWAITING_VALUE);
        lastWriteCompleteTimeRef.current = 0;
      }

      if (Date.now() - lastWriteCompleteTimeRef.current > SYNC_WRITE_MAX) {
        // Surpassed the allowed polling time, give up.
        stopPolling();
      }

      try {
        const value = await loadData();
        if (isEqual(value, awaitingWriteValue)) {
          // Value hit what we were expecting, stop polling.
          stopPolling();
        }
      } catch {
        // Error was captured and set by loadData.  Abandon pooling.
        stopPolling();
      }
    },
    SYNC_WRITE_DELAY,
    isAwaitingWriteValue,
  );

  const [value, valueReceived] = React.useState(undefined);
  const [errorMessage, setErrorMessage] = React.useState(null);

  // Function the consumer can call to refresh the value.
  const refresh = React.useCallback(() => {
    // Do not try to trigger a refresh if we are currently polling.
    if (isAwaitingWriteValue) {
      return;
    }
    setRefreshCounter(refreshCounter + 1);
  }, [isAwaitingWriteValue, refreshCounter]);

  // Whenever the thing or property changes, or when a refresh is requested, load the data.
  React.useEffect(() => {
    if (isAwaitingWriteValue) {
      return;
    }
    loadData();
  }, [thingDefinition, thingSourceUrl, propertyKey, refreshCounter]);

  const setValue = React.useCallback(
    (value: any) => {
      async function writeData() {
        setWriting(true);
        setErrorMessage(null);
        try {
          if (!thingDefinition || !thingSourceUrl) {
            throw new Error("Property not found.");
          }

          await setThingPropertyValue(
            thingDefinition,
            thingSourceUrl,
            propertyKey,
            value,
          );

          // Start polling to await the new value.
          lastWriteCompleteTimeRef.current = Date.now();
          setAwaitingWriteValue(value);
        } catch (e) {
          setErrorMessage(e.message);
        } finally {
          setWriting(false);
        }
      }
      writeData();
    },
    [thingDefinition, thingSourceUrl, propertyKey, refresh],
  );

  return {
    refresh,
    setValue,
    isRefreshing: isReading || isWriting,
    value,
    errorMessage,
  };
}
