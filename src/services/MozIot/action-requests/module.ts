import { ContainerModule } from "microinject";
import { ActionRequestFactoryImpl } from "./components/impl/ActionRequestFactoryImpl";
import { ActionRequestRepositoryImpl } from "./components/impl/ActionRequestRepositoryImpl";

export default new ContainerModule(bind => {
  bind(ActionRequestFactoryImpl);
  bind(ActionRequestRepositoryImpl);
});
