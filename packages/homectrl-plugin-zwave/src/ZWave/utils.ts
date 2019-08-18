import { ZWaveValue, ZWaveNode } from "./types";

export function areValuesSame(a: ZWaveValue, b: ZWaveValue): boolean {
  return (
    a.node_id === b.node_id &&
    a.class_id === b.class_id &&
    a.instance === b.instance &&
    a.index === b.index
  );
}

export function* getAllValues(node: ZWaveNode) {
  for (const class_id of Object.keys(node.classes).map(Number)) {
    for (const instance_id of Object.keys(node.classes[class_id]).map(Number)) {
      for (const index of Object.keys(node.classes[class_id][instance_id]).map(
        Number
      )) {
        yield node.classes[class_id][instance_id][index];
      }
    }
  }
}
