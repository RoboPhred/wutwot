import { ContainerModule } from "microinject";
import { ReplServer } from "./ReplServer";

export default new ContainerModule(bind => {
  bind(ReplServer);
});
