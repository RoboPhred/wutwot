import * as React from "react";
import { useTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";

const ThingsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer title={t("things.noun_titlecase")}>
      Hello World
    </PageContainer>
  );
};

export default ThingsPage;
