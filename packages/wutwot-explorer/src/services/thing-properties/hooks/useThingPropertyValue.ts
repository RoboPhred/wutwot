import * as React from "react";

import { useAppSelector } from "@/store/selectors";

import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { getThingPropertyValue, setThingPropertyValue } from "../api";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";

export interface UsePropertyValue {
  refresh(): void;
  setValue(value: any): void;
  isRefreshing: boolean;
  value: any;
  errorMessage: string | null;
}
export function useThingPropertyValue(
  thingDisplayId: string,
  propertyKey: string,
): UsePropertyValue {
  const [refreshCounter, setRefreshCounter] = React.useState(0);
  const [isReading, setReading] = React.useState(false);

  const [isWriting, setWriting] = React.useState(false);
  const suppressRefreshRef = React.useRef(false);

  const [value, valueReceived] = React.useState(undefined);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const data = useAppSelector((state) =>
    thingDataSelector(state, thingDisplayId),
  );
  const sourceUrl = useAppSelector((state) =>
    thingSourceUrlSelector(state, data.sourceId),
  );

  React.useEffect(() => {
    async function loadData() {
      setReading(true);
      setErrorMessage(null);
      try {
        if (!data || !sourceUrl) {
          throw new Error("Property not found.");
        }
        const value = await getThingPropertyValue(
          data.definition,
          sourceUrl,
          propertyKey,
        );
        valueReceived(value);
        setErrorMessage(null);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setReading(false);
      }
    }

    loadData();
  }, [data, sourceUrl, propertyKey, refreshCounter]);

  const refresh = React.useCallback(() => {
    if (suppressRefreshRef.current) {
      // We will refresh after we write.
      // We need to do this, as if we bump refresh counter now,
      //  the write will bump it to the same value and no refresh
      //  will occur.
      return;
    }
    setRefreshCounter(refreshCounter + 1);
  }, [isWriting, refreshCounter]);

  const setValue = React.useCallback(
    (value: any) => {
      async function writeData() {
        setWriting(true);
        suppressRefreshRef.current = true;
        setErrorMessage(null);
        try {
          if (!data || !sourceUrl) {
            throw new Error("Property not found.");
          }

          await setThingPropertyValue(
            data.definition,
            sourceUrl,
            propertyKey,
            value,
          );
          setRefreshCounter(refreshCounter + 1);
        } catch (e) {
          setErrorMessage(e.message);
        } finally {
          setWriting(false);
          suppressRefreshRef.current = false;
        }
      }
      writeData();
    },
    [data, sourceUrl, propertyKey, refreshCounter],
  );

  return {
    refresh,
    setValue,
    isRefreshing: isReading || isWriting,
    value,
    errorMessage,
  };
}
