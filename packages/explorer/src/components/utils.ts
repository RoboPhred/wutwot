import * as React from "react";
import { useHistory } from "react-router";

export interface UseLinkClickedOpts {
  to: string;
  target?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}
export interface UseLinkClicked {
  onLinkClick(e: React.MouseEvent<HTMLElement>): void;
  href: string;
}
export function useLinkClicked(opts: UseLinkClickedOpts): UseLinkClicked {
  const { to, target, onClick } = opts;

  const history = useHistory();

  const onLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (
        !e.defaultPrevented && // onClick prevented default
        e.button === 0 && // ignore everything but left clicks
        (!target || target === "_self") && // let browser handle "target=_blank" etc.
        !isModifierPressed(e) // ignore clicks with modifier keys
      ) {
        e.preventDefault();

        history.push(to);
      }
    },
    [history, to, target, onClick],
  );

  return {
    onLinkClick,
    href: history.createHref({ pathname: to }),
  };
}

function isModifierPressed(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
