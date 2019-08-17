import * as React from "react";

import { Thing } from "../types";
import { getThing } from "../api";

export function useThing(thingId: string): Thing | null {
  const [thing, setThing] = React.useState<Thing | null>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const things = await getThing(thingId);
      setThing(things);
    };
    fetchData();
  }, []);

  return thing;
}
