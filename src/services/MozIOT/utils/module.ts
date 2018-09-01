import { ContainerModule } from "microinject";
import { IdMapperImpl } from "./impl/IdMapperImpl";

export default new ContainerModule(bind => {
  bind(IdMapperImpl);
});
