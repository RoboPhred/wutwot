import * as React from "react";
import { v4 as uuidV4 } from "uuid";
import entries from "lodash/entries";
import first from "lodash/first";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector } from "@/store/selectors";

import { thingDataSelector } from "@/services/thing-definitions/selectors";
import { thingSourceUrlSelector } from "@/services/thing-sources/selectors";

import { setThingPropertyValue } from "../api";
import { asArray, MaybeArray } from "@/types";
import { observeThingProperty } from "@/actions/thing-property-observe";
import { unobserveThingProperty } from "@/actions/thing-property-unobserve";
import { observationSelector } from "../selectors/observations";
import { AppState } from "@/state";

export interface UsePropertyValue {
  refresh(): void;
  isWritable: boolean;
  setValue(value: any): void;
  isRefreshing: boolean;
  value: any;
  errorMessage: string | null;
}

export interface PropertySelector {
  propertyKey?: string;
  semanticTypes?: MaybeArray<string>;
}

export function useThingPropertyValue(
  thingDisplayId: string,
  propertySelector: string | PropertySelector,
): UsePropertyValue {
  const dispatch = useDispatch();
  const [observerId] = React.useState(uuidV4());
  let normalizedPropertySelector: PropertySelector;
  if (typeof propertySelector === "string") {
    normalizedPropertySelector = { propertyKey: propertySelector };
  } else {
    normalizedPropertySelector = propertySelector;
  }

  // Details about the thing we are handling values for.
  const { definition: thingDefinition, sourceId: thingSourceId } =
    useAppSelector((state) => thingDataSelector(state, thingDisplayId)) ?? {
      definition: null,
      sourceId: null,
    };

  let propertyKey =
    first(
      entries(thingDefinition.properties ?? {})
        .filter(([key, property]) => {
          if (
            normalizedPropertySelector.propertyKey &&
            normalizedPropertySelector.propertyKey !== key
          ) {
            return false;
          }

          if (
            normalizedPropertySelector.semanticTypes &&
            !asArray(normalizedPropertySelector.semanticTypes).every(
              (semanticType) =>
                property["@type"] && property["@type"].includes(semanticType),
            )
          ) {
            return false;
          }

          return true;
        })
        .map((x) => x[0]),
    ) ?? null;

  const propertyAffordance =
    propertyKey != null ? thingDefinition.properties![propertyKey] : null;

  // The url the thing was sourced from.
  //  Needed as a fallback if the thing does not specify a base url.
  const thingSourceUrl = useAppSelector((state) =>
    thingSourceUrlSelector(state, thingSourceId),
  );

  React.useEffect(() => {
    if (propertyKey) {
      dispatch(
        observeThingProperty(observerId, { thingDisplayId, propertyKey }),
      );
    }
    return () => {
      dispatch(unobserveThingProperty(observerId));
    };
  }, [observerId, thingDisplayId, propertyKey]);

  const observation = useSelector((state: AppState) =>
    propertyKey
      ? observationSelector(state, thingDisplayId, propertyKey)
      : null,
  );

  console.log(
    "Observation of ",
    thingDisplayId,
    propertyKey,
    "is",
    observation,
  );

  // Boolean indicating if we are in a write operation.
  const [isWriting, setWriting] = React.useState(false);

  // Move writing into redux as well?
  const [writeErrorMessage, setWriteErrorMessage] = React.useState(null);

  // Function the consumer can call to refresh the value.
  const refresh = React.useCallback(() => {
    setWriteErrorMessage(null);
    // TODO: Tell properties service to refresh the value.
  }, []);

  const setValue = React.useCallback(
    (value: any) => {
      async function writeData() {
        setWriting(true);
        setWriteErrorMessage(null);
        try {
          if (!thingDefinition || !thingSourceUrl || !propertyKey) {
            throw new Error("Property not found.");
          }

          await setThingPropertyValue(
            thingDefinition,
            thingSourceUrl,
            propertyKey,
            value,
          );
        } catch (e) {
          setWriteErrorMessage(e.message);
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
    isWritable: propertyAffordance?.readOnly !== true,
    setValue,
    // TODO: Pull state value indicating whether observations are refreshing
    isRefreshing: isWriting,
    value: observation?.value ?? null,
    errorMessage: writeErrorMessage ?? observation?.errorMessage ?? null,
  };
}
