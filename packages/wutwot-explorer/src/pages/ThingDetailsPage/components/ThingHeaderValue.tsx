import * as React from "react";
import { useTranslation } from "react-i18next";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export interface ThingValueProps {
  i18nTitle: string;
  value: string | number | undefined;
  i18nFallback: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(),
    },
    value: {
      // paddingLeft: theme.spacing(),
    },
  }),
);

const ThingHeaderValue: React.FC<ThingValueProps> = ({
  i18nTitle,
  value,
  i18nFallback,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const hasValue = value != undefined;
  return (
    <div className={classes.root}>
      <Typography variant="overline">{t(i18nTitle)}</Typography>
      <Typography
        className={classes.value}
        color={hasValue ? ("textPrimary" as const) : ("textSecondary" as const)}
      >
        {hasValue ? value : t(i18nFallback)}
      </Typography>
    </div>
  );
};

export default ThingHeaderValue;
