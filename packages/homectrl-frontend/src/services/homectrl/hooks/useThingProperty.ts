import * as React from "react";
import { getThingPropertyValue, setThingPropertyValue } from "../api";

export function useThingProperty(
  thingId: string,
  propertyId: string
): [any, (value: any) => void] {
  const [propertyValue, setValue] = React.useState<any>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const value = await getThingPropertyValue(thingId, propertyId);
      setValue(value);
    };
    fetchData();
  }, []);

  const setPropertyValue = React.useCallback(
    (value: any) => {
      const setData = async () => {
        setValue(value);
        await setThingPropertyValue(thingId, propertyId, value);
      };
      setData();
    },
    [thingId, propertyId, setValue]
  );

  return [propertyValue, setPropertyValue];
}
