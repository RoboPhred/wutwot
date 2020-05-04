import * as React from "react";

import { useAppSelector } from "@/store/selectors";

import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { getThingPropertyValue } from "../api";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";

export interface UsePropertyValue {
  refresh(): void;
  isRefreshing: boolean;
  value: any;
  errorMessage: string | null;
}
export function useThingPropertyValue(
  thingDisplayId: string,
  propertyKey: string,
): UsePropertyValue {
  const [refreshCounter, setRefreshCounter] = React.useState(0);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [value, setValue] = React.useState(undefined);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const data = useAppSelector((state) =>
    thingDataSelector(state, thingDisplayId),
  );
  const sourceUrl = useAppSelector((state) =>
    thingSourceUrlSelector(state, data.sourceId),
  );

  React.useEffect(() => {
    async function loadData() {
      setRefreshing(true);
      try {
        if (!data || !sourceUrl) {
          throw new Error("Property not found.");
        }
        const value = await getThingPropertyValue(
          data.definition,
          sourceUrl,
          propertyKey,
        );
        setValue(value);
        setErrorMessage(null);
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setRefreshing(false);
      }
    }

    loadData();
  }, [data, sourceUrl, propertyKey, refreshCounter]);

  const refresh = React.useCallback(() => {
    setRefreshCounter(refreshCounter + 1);
  }, [refreshCounter]);

  return {
    refresh,
    isRefreshing,
    value,
    errorMessage,
  };
}
