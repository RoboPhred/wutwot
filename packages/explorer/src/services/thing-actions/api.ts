import { Thing } from "@wutwot/w3c-td";
import find from "lodash/find";

import { maybeArrayContains } from "@/types";

import { executeForm, isSupportedForm } from "../thing-forms/api";

// TODO: Should this exist?  Apparently I saw some default op assignment somewhere for properties, but I am unable to find it again.
const DefaultActionOp = ["invokeaction"];

export async function invokeThingAction(
  thing: Thing,
  sourceUrl: string,
  actionKey: string,
  input: any,
) {
  if (!thing.actions) {
    throw new Error("Action does not exist.");
  }

  const actions = thing.actions[actionKey];
  if (!actions) {
    throw new Error("Action does not exist.");
  }

  const form = find(
    actions.forms,
    (form) =>
      isSupportedForm(thing, sourceUrl, form) &&
      maybeArrayContains(form.op ?? DefaultActionOp, "invokeaction"),
  );
  if (!form) {
    throw new Error("Action has no supported 'invokeaction' form.");
  }

  const result = await executeForm(
    thing,
    sourceUrl,
    form,
    "invokeaction",
    input,
  );
  return result;
}
