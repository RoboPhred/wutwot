export function createId(title: string, existingIds?: string[]): string {
  let id = stripId(title);
  if (existingIds) {
    while (existingIds.indexOf(id) !== -1) {
      id = nextIdPostfix(id);
    }
  }
  return id;
}

const ID_STRIP = /[^a-zA-Z0-9\-\_]/g;
function stripId(id: string): string {
  return id.replace(/\s+/g, "-").replace(ID_STRIP, "").toLowerCase();
}

const ID_POSTFIX = /(.+)\-(\d+)/;
function nextIdPostfix(id: string): string {
  const match = ID_POSTFIX.exec(id);
  if (!match) {
    return `${id}-1`;
  }
  return `${match[1]}-${Number(match[2]) + 1}`;
}
