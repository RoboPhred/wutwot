import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import sortBy from "lodash/sortBy";

import List from "@material-ui/core/List";

import { thingDatasSelector } from "@/services/thing-definitions/selectors";

import PageContainer from "@/components/PageContainer";

import ThingListItem from "./components/ThingListItem";

const ThingsPage: React.FC = () => {
  const { t } = useTranslation();
  const thingDefs = useSelector(thingDatasSelector);
  const thingIds = sortBy(thingDefs, ["definition.title", "definition.id"]).map(
    (x) => x.displayId,
  );

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
