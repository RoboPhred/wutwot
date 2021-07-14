export namespace ThingsPagePath {
  export const route = "/things";
  export const path = route;
}

export namespace ThingDetailsPagePath {
  export const route = `${ThingsPagePath.route}/thing/:thingId`;

  export function fromDisplayId(displayId: string) {
    return route.replace(":thingId", encodeURIComponent(displayId));
  }
}

export namespace ThingDefinitionPagePath {
  export const route = `${ThingDetailsPagePath.route}/definition`;

  export function fromDisplayId(displayId: string) {
    return route.replace(":thingId", encodeURIComponent(displayId));
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
