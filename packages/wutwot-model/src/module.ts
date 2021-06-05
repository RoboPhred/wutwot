import { ContainerModule } from "microinject";

import { PropertyApplicatorImpl } from "./impl/PropertyApplicatorImpl";

export default new ContainerModule((bind) => {
  bind(PropertyApplicatorImpl);
});
