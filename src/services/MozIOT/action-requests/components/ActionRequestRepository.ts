import { ActionRequestRegistry } from "./ActionRequestRegistry";

export interface ActionRequestRepository extends ActionRequestRegistry {
  addRequest(request: ActionRequestRegistry): void;
}
