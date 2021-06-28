import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

export interface IconButtonMenuProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onOpen(): void;
  onClose(): void;
}

const IconButtonMenu: React.FC<IconButtonMenuProps> = ({
  id,
  label,
  icon,
  open,
  onOpen,
  onClose,
  children,
}) => {
  const moreIconRef = React.useRef(null);
  const onMoreMenuClick = React.useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <IconButton
        ref={moreIconRef}
        aria-label={label}
        aria-controls={id}
        aria-haspopup={true}
        color="inherit"
        onClick={onMoreMenuClick}
      >
        {icon}
      </IconButton>
      <Menu
        id={id}
        keepMounted
        anchorEl={moreIconRef.current}
        open={open}
        onClose={onClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default IconButtonMenu;
