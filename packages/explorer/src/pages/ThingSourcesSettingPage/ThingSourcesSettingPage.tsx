import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

import { thingSourcesSelector } from "@/services/thing-sources/selectors";
import { thingDefinitionErrorsSelector } from "@/services/thing-definitions/selectors";

import PageContainer from "@/components/PageContainer";

import ThingSourceListItem from "./components/ThingSourceListItem";
import AddThingSourceDialog from "./components/AddThingSourceDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    },
  }),
);

const ThingSourcesSettingPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const sourceUrls = useSelector(thingSourcesSelector);

  const [isAdding, setIsAdding] = React.useState(false);
  const onAddClick = React.useCallback(() => {
    setIsAdding(true);
  }, []);
  const onStopAdding = React.useCallback(() => {
    setIsAdding(false);
  }, []);

  const defErrors = useSelector(thingDefinitionErrorsSelector);
  let toolbarItems: React.ReactNode = null;
  const errorCount = Object.keys(defErrors).length;
  if (errorCount > 0) {
    toolbarItems = (
      <IconButton title={t("errors.error_count", { count: errorCount })}>
        <ErrorIcon />
      </IconButton>
    );
  }

  return (
    <PageContainer
      title={t("thing_sources.noun_titlecase_plural")}
      back
      toolbarItems={toolbarItems}
    >
      <List>
        {sourceUrls.map((source) => (
          <ThingSourceListItem key={source.id} {...source} />
        ))}
      </List>
      <SpeedDial
        ariaLabel={t("thing_sources.verb.new_descriptive")}
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        open={false}
        direction="up"
        onClick={onAddClick}
      />
      <AddThingSourceDialog open={isAdding} onRequestClose={onStopAdding} />
    </PageContainer>
  );
};

export default ThingSourcesSettingPage;
