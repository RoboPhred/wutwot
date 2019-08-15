import { createStandardAction } from "typesafe-actions";
import { Thing } from "../types/Thing";

export const receiveThingsBegin = createStandardAction(
  "homectrl/receive-things:begin"
)<void>();
export type ReceiveThingsBeginAction = ReturnType<typeof receiveThingsBegin>;

export const receiveThingsSuccess = createStandardAction(
  "homectrl/receive-things:success"
)<Thing[]>();
export type ReceiveThingsSuccessAction = ReturnType<
  typeof receiveThingsSuccess
>;

export const receiveThingsError = createStandardAction(
  "homectrl/receive-things:error"
)<string>();
export type ReceiveThingsErrorAction = ReturnType<typeof receiveThingsError>;

export type ReceiveThingsAction =
  | ReceiveThingsBeginAction
  | ReceiveThingsSuccessAction
  | ReceiveThingsErrorAction;
