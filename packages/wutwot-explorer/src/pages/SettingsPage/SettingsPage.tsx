import * as React from "react";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import ListItemLink from "@/components/ListItemLink";
import PageContainer from "@/components/PageContainer";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("settings.noun_titlecase_plural")}>
      <List>
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
