import { ContainerModule } from "microinject";
import { TestAdapterImpl } from "./TestAdapterImpl";

export default new ContainerModule(bind => {
  bind(TestAdapterImpl);
});
