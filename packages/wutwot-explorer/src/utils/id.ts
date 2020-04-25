export function stripId(id: string): string {
  return id.replace(/[\w]/g, "-").toLowerCase();
}

const ID_POSTFIX = /(.+)\-(\d+)/;
export function nextIdPostfix(id: string): string {
  const match = ID_POSTFIX.exec(id);
  if (!match) {
    return `${id}-1`;
  }
  return `${match[1]}-${Number(match[2]) + 1}`;
}
