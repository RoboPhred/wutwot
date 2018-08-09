import { ContainerModule } from "microinject";
import { EndpointImpl } from "./impl/EndpointImpl";

export default new ContainerModule(bind => {
  bind(EndpointImpl);
});
