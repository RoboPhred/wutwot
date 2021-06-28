import * as React from "react";
import { useHistory } from "react-router";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export interface BackButtonProps {
  className?: string;
}

type Props = BackButtonProps;
const BackButton: React.FC<Props> = ({ className }) => {
  const { goBack } = useHistory();
  return (
    <IconButton
      className={className}
      color="inherit"
      aria-label="Back"
      onClick={goBack}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
