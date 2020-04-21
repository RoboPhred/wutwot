import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import List from "@material-ui/core/List";

import { thingIdsSelector } from "@/services/thing-definitions/selectors";

import PageContainer from "@/components/PageContainer";

import ThingListItem from "./components/ThingListItem";

const ThingsPage: React.FC = () => {
  const { t } = useTranslation();
  const thingIds = useSelector(thingIdsSelector);
  // TODO: Sort by title
  return (
    <PageContainer title={t("things.noun_titlecase_plural")}>
      <List>
        {thingIds.map((id) => (
          <ThingListItem key={id} id={id} />
        ))}
      </List>
    </PageContainer>
  );
};

export default ThingsPage;
