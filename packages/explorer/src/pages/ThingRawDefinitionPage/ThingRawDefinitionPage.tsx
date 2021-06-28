import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";
import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

export interface ThingRawDefinitionRouteParams {
  displayId: string;
}

export type ThingRawDefinitionPageProps = RouteComponentProps<
  ThingRawDefinitionRouteParams
>;

const ThingRawDefinitionPage: React.FC<ThingRawDefinitionPageProps> = ({
  match,
}) => {
  let { displayId } = match.params;
  displayId = decodeURIComponent(displayId);

  const { t } = useTranslation();
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, displayId),
  );

  if (!definition) {
    return (
      <PageContainer title={t("things.not_found")}>
        <Typography>{t("things.not_found")}</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`${definition.title} - ${t("thing_definitions.noun_titlecase")}`}
      back
    >
      <code>
        <pre>{JSON.stringify(definition, null, 2)}</pre>
      </code>
    </PageContainer>
  );
};

export default ThingRawDefinitionPage;
