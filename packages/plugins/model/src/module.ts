import { ContainerModule } from "microinject";

import { PropertyApplicator } from "./components/PropertyApplicator";

export default new ContainerModule((bind) => {
  bind(PropertyApplicator);
});
