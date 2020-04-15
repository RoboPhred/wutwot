import { inspect, InspectOptionsStylized } from "util";

export interface JSONAble {
  toJSON(): any;
}

export function isJSONAble(obj: any): obj is JSONAble {
  return typeof (obj as any).toJSON === "function";
}

export function makeInspectJson<T extends JSONAble>(
  name: string,
): (depth: number, options: InspectOptionsStylized) => string {
  return function (
    this: JSONAble,
    depth: number,
    options: InspectOptionsStylized,
  ) {
    if (depth < 0) {
      return options.stylize(`[${name}]`, "special");
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth == null ? null : options.depth - 1,
    });

    const inner = inspect(this.toJSON(), newOptions);
    return `${name} ${inner}`;
  };
}
