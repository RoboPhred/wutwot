import * as React from "react";

import PageContainer from "@/components/PageContainer";

import ThingGrid from "./components/ThingGrid";

const ThingsPage: React.FC = () => (
  <PageContainer title="things">
    <ThingGrid />
  </PageContainer>
);
export default ThingsPage;
