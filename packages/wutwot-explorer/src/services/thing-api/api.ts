import isRelativeUrl from "is-relative-url";
import urlJoin from "url-join";
import { Form, Thing } from "@wutwot/td";

export async function executeForm(
  thing: Thing,
  sourceUrl: string,
  form: Form,
): Promise<any> {
  let url = form.href;
  const baseUrl = thing.base || sourceUrl;
  if (isRelativeUrl(url)) {
    url = urlJoin(baseUrl, url);
  }

  const request: RequestInit = {
    // TODO: expand definition and get from IRI
    method: (form as any)["htv:methodName"] ?? "GET",
  };

  const response = await fetch(url, request);
  const body = await response.json();
  return body;
}
