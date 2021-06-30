import { ContainerModule } from "microinject";

import { ThingScope } from "../things";

import { InternalActionFactory } from "./components";

import { ActionEventSourceImpl } from "./impl/ActionEventSourceImpl";
import { internalActionFactoryImpl } from "./impl/InternalActionFactoryImpl";
import { InternalActionImpl } from "./impl/InternalActionImpl";
import { LocalActionsManagerImpl } from "./impl/LocalActionsManagerImpl";

export default new ContainerModule((bind) => {
  bind(InternalActionFactory)
    .toFactory(internalActionFactoryImpl)
    .inScope(ThingScope);
  bind(ActionEventSourceImpl);
  bind(InternalActionImpl);
  bind(LocalActionsManagerImpl);
});
