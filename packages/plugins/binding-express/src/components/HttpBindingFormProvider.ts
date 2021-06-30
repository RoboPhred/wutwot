import { inject, injectable, provides, singleton } from "microinject";
import { FormProvider, Thing, ThingAction, ThingProperty } from "@wutwot/core";
import { ExpressRootUrl } from "@wutwot/plugin-servient-express";
import { Form } from "@wutwot/td";

@injectable()
@singleton()
@provides(FormProvider)
export class HttpBindingFormProvider implements FormProvider {
  constructor(@inject(ExpressRootUrl) private _rootUrl: ExpressRootUrl) {}

  getPropertyForms(thing: Thing, property: ThingProperty): Form | Form[] {
    // We used to use relative paths to the TDThing's base property.
    // Since these forms are going to be shared between multiple sources, we are switching to
    // full urls.
    const thingPropertiesPath = `${this._rootUrl}/things/${thing.id}/properties`;

    let forms: Form[] = [
      {
        op: "readproperty",
        href: `${thingPropertiesPath}/${property.id}`,
      },
    ];

    if (!property.readOnly) {
      forms.push({
        op: "writeproperty",
        href: `${thingPropertiesPath}/${property.id}`,
      });
    }

    return forms;
  }

  getActionForms(thing: Thing, action: ThingAction): Form | Form[] {
    // We used to use relative paths to the TDThing's base property.
    // Since these forms are going to be shared between multiple sources, we are switching to
    // full urls.
    const thingActionsPath = `${this._rootUrl}/things/${thing.id}/actions`;

    let forms: Form[] = [
      {
        op: "invokeaction",
        href: `${thingActionsPath}/${action.id}`,
      },
    ];

    return forms;
  }
}
