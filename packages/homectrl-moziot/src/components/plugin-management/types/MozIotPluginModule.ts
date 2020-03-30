import { Binder } from "microinject";

export interface MozIotPluginModule {
  onBindServices?(bind: (id: any) => Binder): void;
}
