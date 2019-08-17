import * as React from "react";

import Switch from "@material-ui/core/Switch";

import { useThingProperty } from "@/services/homectrl/hooks/useThingProperty";

export interface BooleanPropertySwitchProps {
  thingId: string;
  propertyId: string;
}

const BooleanPropertySwitch: React.FC<BooleanPropertySwitchProps> = ({
  thingId,
  propertyId
}) => {
  const [value, setValue] = useThingProperty(thingId, propertyId);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.checked);
    },
    [setValue]
  );

  return (
    <Switch checked={Boolean(value)} onChange={onChange} color="primary" />
  );
};

export default BooleanPropertySwitch;
