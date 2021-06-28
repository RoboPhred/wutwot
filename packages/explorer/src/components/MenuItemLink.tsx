import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";

import { useLinkClicked } from "./utils";

export interface MenuItemLinkProps {
  to: string;
  target?: string;
  disabled?: boolean;
  onClick?(e: React.MouseEvent<any>): void;
  children?: React.ReactNode;
}

const MenuItemLink = React.forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
  ({ to, target, disabled, onClick, children }, ref) => {
    const { onLinkClick, href } = useLinkClicked({ to, target, onClick });
    return (
      <MenuItem
        ref={ref}
        component="a"
        href={href}
        disabled={disabled}
        onClick={onLinkClick}
      >
        {children}
      </MenuItem>
    );
  },
);

export default MenuItemLink;
