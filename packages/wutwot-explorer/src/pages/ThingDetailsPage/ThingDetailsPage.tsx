import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

import { useToggleState } from "@/hooks/useBooleanState";

import PageContainer from "@/components/PageContainer";
import MoreMenuButton from "@/components/MoreMenuButton";
import MenuItemLink from "@/components/MenuItemLink";

export interface ThingDetailsRouteParams {
  thingId: string;
}

export type ThingDetailsPageProps = RouteComponentProps<
  ThingDetailsRouteParams
>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(),
    },
  }),
);

const ThingDetailsPage: React.FC<ThingDetailsPageProps> = ({ match }) => {
  let { thingId } = match.params;
  thingId = decodeURIComponent(thingId);

  const classes = useStyles();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen, setMenuClosed] = useToggleState();

  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingId),
  );

  if (!definition) {
    return (
      <PageContainer title={t("things.not_found")}>
        <div className={classes.root}>
          <Typography>{t("things.not_found")}</Typography>
        </div>
      </PageContainer>
    );
  }

  const toolbarItems = (
    <MoreMenuButton
      id="appbar-menu"
      open={menuOpen}
      onOpen={setMenuOpen}
      onClose={setMenuClosed}
    >
      <MenuItemLink
        to={`/things/${match.params.thingId}/definition`}
        onClick={setMenuClosed}
      >
        {t("things.view_raw_definition")}
      </MenuItemLink>
    </MoreMenuButton>
  );

  const { title, description } = definition;
  return (
    <PageContainer
      title={`${title} - ${t("things.noun_titlecase")}`}
      back
      toolbarItems={toolbarItems}
    >
      <div className={classes.root}>
        {description && (
          <div>
            <Typography variant="overline">Description</Typography>
            <Typography>{description}</Typography>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ThingDetailsPage;
