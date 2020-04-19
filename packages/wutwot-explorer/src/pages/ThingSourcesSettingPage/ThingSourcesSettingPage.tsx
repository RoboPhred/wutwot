import * as React from "react";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";

import PageContainer from "@/components/PageContainer";

const ThingSourcesSettingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("settings.thing_sources")}>
      <List></List>
    </PageContainer>
  );
};

export default ThingSourcesSettingPage;
