import * as React from "react";

import { Thing } from "@wutwot/w3c-td";
import { useSelector } from "react-redux";

import { asArray, maybeArrayContains } from "@/types";

import { thingDefinitionsSelector } from "../selectors";

export type ThingWithDisplayId = Thing & { displayId: string };

export type UseThings = ThingWithDisplayId[];

export interface UseThingsOptions {
  semanticTypeFilter?: string | string[];
}

export function useThings(opts: UseThingsOptions = {}): UseThings {
  const { semanticTypeFilter } = opts;

  const things = useSelector(thingDefinitionsSelector);

  return React.useMemo(() => {
    let semanticFilterItems = semanticTypeFilter
      ? asArray(semanticTypeFilter)
      : null;
    return things.filter(
      (thing) =>
        !semanticFilterItems ||
        semanticFilterItems.some((item) =>
          maybeArrayContains(thing["@type"], item),
        ),
    );
  }, [things, semanticTypeFilter]);
}
