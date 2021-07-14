import * as React from "react";
import { useTranslation } from "react-i18next";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";

import { ThingDetailsPagePath } from "@/paths";

import { useThings } from "@/services/thing-definitions/hooks/useThings";

import ListItemLink from "@/components/ListItemLink";
import PageContainer from "@/components/PageContainer";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const managementThings = useThings({
    semanticTypeFilter: WutWotTDIRIs.Management,
  });

  return (
    <PageContainer title={t("settings.noun_titlecase_plural")}>
      <List>
        {managementThings.length > 0 && (
          <>
            <ListSubheader>{t("settings.thing_settings")}</ListSubheader>
            {managementThings.map(({ title, description, displayId }) => (
              // TODO: Link to settings page for thing
              <ListItemLink
                button
                to={ThingDetailsPagePath.fromDisplayId(displayId)}
              >
                <ListItemText primary={title} secondary={description} />
              </ListItemLink>
            ))}
            <Divider />
          </>
        )}
        <ListSubheader>{t("settings.explorer_settings")}</ListSubheader>
        <ListItemLink button to="/settings/thing-sources">
          <ListItemText>
            {t("thing_sources.noun_titlecase_plural")}
          </ListItemText>
        </ListItemLink>
      </List>
    </PageContainer>
  );
};

export default SettingsPage;
