export namespace ThingsPagePath {
  export const route = "/things";
  export const path = route;
}

export namespace ThingDetailsPagePath {
  export interface PathParams {
    displayId: string;
  }
  export const DisplayIdParam = "displayId";
  export const route = `${ThingsPagePath.route}/thing/:${DisplayIdParam}`;

  export function fromDisplayId(displayId: string) {
    return route.replace(`:${DisplayIdParam}`, encodeURIComponent(displayId));
  }
}

export namespace ThingDefinitionPagePath {
  export type PathParams = ThingDetailsPagePath.PathParams;
  export const DisplayIdParam = ThingDetailsPagePath.DisplayIdParam;
  export const route = `${ThingDetailsPagePath.route}/definition`;

  export function fromDisplayId(displayId: string) {
    return route.replace(`:${DisplayIdParam}`, encodeURIComponent(displayId));
  }
}

export namespace SettingsPagePath {
  export const route = "/settings";
  export const path = route;
}

export namespace ThingSourcesSettingPagePath {
  export const route = `${SettingsPagePath.route}/thing-sources`;
  export const path = route;
}
