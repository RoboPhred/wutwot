import * as React from "react";

import { Thing } from "../types";
import { getThings } from "../api";

export function useThings(): Thing[] {
  const [things, setThings] = React.useState<Thing[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const things = await getThings();
      setThings(things);
    };
    fetchData();
  }, []);

  return things;
}
