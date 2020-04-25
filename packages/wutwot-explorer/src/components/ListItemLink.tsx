import * as React from "react";

import ListItem from "@material-ui/core/ListItem";

import { useLinkClicked } from "./utils";

export interface ListItemLinkProps {
  to: string;
  autoselect?: boolean;
  target?: string;
  button?: boolean;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<any>): void;
  children?: React.ReactNode;
}

const ListItemLink = React.forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  ({ to, target, disabled, autoselect, button, onClick, children }, ref) => {
    const { onLinkClick, href } = useLinkClicked({ to, target, onClick });
    return (
      <ListItem
        selected={autoselect && pathStartsWith(location.pathname, to)}
        component="a"
        button={button as any} // typings are weird here.  `button` works fine, `button={true}` does not.
        href={href}
        disabled={disabled}
        onClick={onLinkClick}
      >
        {children}
      </ListItem>
    );
  },
);

export default ListItemLink;

function pathStartsWith(path: string, startsWith: string): boolean {
  if (path === startsWith) {
    return true;
  }

  return path.substr(0, startsWith.length + 1) === `${startsWith}/`;
}
