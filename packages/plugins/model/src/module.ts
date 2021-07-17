import { ContainerModule } from "microinject";

import { ModelPropertyApplicatorImpl } from "./impl/ModelPropertyApplicatorImpl";

export default new ContainerModule((bind) => {
  bind(ModelPropertyApplicatorImpl);
});
