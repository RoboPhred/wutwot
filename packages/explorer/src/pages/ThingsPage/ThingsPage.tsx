import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import sortBy from "lodash/sortBy";

import List from "@material-ui/core/List";
import ErrorIcon from "@material-ui/icons/Error";

import {
  thingDatasSelector,
  thingDefinitionErrorsSelector,
} from "@/services/thing-definitions/selectors";

import PageContainer from "@/components/PageContainer";
import IconButtonLink from "@/components/IconButtonLink";

import ThingListItem from "./components/ThingListItem";

const ThingsPage: React.FC = () => {
  const { t } = useTranslation();
  const thingDefs = useSelector(thingDatasSelector);
  const thingIds = sortBy(thingDefs, ["definition.title", "definition.id"]).map(
    (x) => x.displayId,
  );
  const defErrors = useSelector(thingDefinitionErrorsSelector);

  let toolbarItems: React.ReactNode = null;
  const errorCount = Object.keys(defErrors).length;
  if (errorCount > 0) {
    toolbarItems = (
      <IconButtonLink
        to="/settings/thing-sources"
        title={t("errors.error_count", { count: errorCount })}
      >
        <ErrorIcon />
      </IconButtonLink>
    );
  }

  return (
    <PageContainer
      title={t("things.noun_titlecase_plural")}
      toolbarItems={toolbarItems}
    >
      <List>
        {thingIds.map((id) => (
          <ThingListItem key={id} id={id} />
        ))}
      </List>
    </PageContainer>
  );
};

export default ThingsPage;
