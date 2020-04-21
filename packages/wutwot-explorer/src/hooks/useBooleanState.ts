import * as React from "react";

export function useToggleState(
  defaultValue: boolean = false,
): [boolean, () => void, () => void] {
  const [state, setState] = React.useState(defaultValue);
  const onSetTrue = React.useCallback(() => {
    setState(true);
  }, []);
  const onSetFalse = React.useCallback(() => {
    setState(false);
  }, []);
  return [state, onSetTrue, onSetFalse];
}
