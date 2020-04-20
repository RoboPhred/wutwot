import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";
import { useAppSelector } from "@/store/selectors";
import { thingDefinitionSelector } from "@/services/thing-definitions/selectors";

export interface ThingDetailsRouteParams {
  // TODO: These are not good path params as they are full uris, sometimes urls.
  //  Should generate a local id, possibly based on title.
  thingId: string;
}

export type ThingDetailsPageProps = RouteComponentProps<
  ThingDetailsRouteParams
>;

const ThingDetailsPage: React.FC<ThingDetailsPageProps> = ({ match }) => {
  let { thingId } = match.params;
  thingId = decodeURIComponent(thingId);

  const { t } = useTranslation();
  const definition = useAppSelector((state) =>
    thingDefinitionSelector(state, thingId),
  );

  if (!definition) {
    return (
      <PageContainer title={t("things.not_found")}>
        <Typography>{t("things.not_found")}</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={`${t("things.noun_titlecase_plural")}`} back>
      <code>
        <pre>{JSON.stringify(definition, null, 2)}</pre>
      </code>
    </PageContainer>
  );
};

export default ThingDetailsPage;
