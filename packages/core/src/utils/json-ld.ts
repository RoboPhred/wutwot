// TODO: Theres typescript typings for json-ld, use them.
export function addContext(context: any): (jsonld: any) => any {
  return (jsonld: any) => {
    const existingContext = jsonld["@context"] || [];

    if (existingContext == null) {
      return {
        ...jsonld,
        "@context": context,
      };
    }

    if (Array.isArray(existingContext)) {
      return {
        ...jsonld,
        "@context": [...existingContext, context],
      };
    }

    return {
      ...jsonld,
      "@context": [existingContext, context],
    };
  };
}
