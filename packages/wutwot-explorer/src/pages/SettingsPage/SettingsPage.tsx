import * as React from "react";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemLink from "@/components/ListItemLink";
import PageContainer from "@/components/PageContainer";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("settings.noun_titlecase")}>
      <List>
        <ListItemLink button to="/settings/thing-sources">
          <ListItemText>{t("settings.thing_sources")}</ListItemText>
        </ListItemLink>
      </List>
    </PageContainer>
  );
};

export default SettingsPage;
