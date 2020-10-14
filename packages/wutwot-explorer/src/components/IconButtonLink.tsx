import * as React from "react";

import IconButton from "@material-ui/core/IconButton";

import { useLinkClicked } from "./utils";

export interface MenuItemLinkProps {
  to: string;
  target?: string;
  disabled?: boolean;
  title?: string;
  onClick?(e: React.MouseEvent<any>): void;
  children?: React.ReactNode;
}

const IconButtonLink = React.forwardRef<HTMLAnchorElement, MenuItemLinkProps>(
  ({ to, target, disabled, title, onClick, children }, ref) => {
    const { onLinkClick, href } = useLinkClicked({ to, target, onClick });
    return (
      <IconButton
        ref={ref}
        component="a"
        href={href}
        title={title}
        disabled={disabled}
        onClick={onLinkClick}
      >
        {children}
      </IconButton>
    );
  },
);

export default IconButtonLink;
