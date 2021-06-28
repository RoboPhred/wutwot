import * as React from "react";

import MoreIcon from "@material-ui/icons/MoreVert";

import IconButtonMenu from "./IconButtonMenu";
import { useTranslation } from "react-i18next";

export interface MoreMenuProps {
  id: string;
  label?: string;
  open: boolean;
  onOpen(): void;
  onClose(): void;
}
const MoreMenuButton: React.FC<MoreMenuProps> = ({
  id,
  label,
  open,
  onOpen,
  onClose,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <IconButtonMenu
      icon={<MoreIcon />}
      label={label || t("more-options")}
      id={id}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >
      {children}
    </IconButtonMenu>
  );
};

export default MoreMenuButton;
