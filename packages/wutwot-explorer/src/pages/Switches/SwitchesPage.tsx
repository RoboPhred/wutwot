import * as React from "react";

import PageContainer from "@/components/PageContainer";

import SwitchesList from "./components/SwitchesList";

const SwitchesPage: React.FC = () => (
  <PageContainer title="Switches">
    <SwitchesList />
  </PageContainer>
);

export default SwitchesPage;
