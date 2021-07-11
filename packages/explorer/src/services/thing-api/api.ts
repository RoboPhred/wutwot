import isRelativeUrl from "is-relative-url";
import urlJoin from "url-join";
import { Form, Thing, FormOp } from "@wutwot/w3c-td";

// https://www.w3.org/TR/wot-binding-templates/#http-default-vocabulary-terms
const DefaultHttpMethodsByOp: Partial<Record<FormOp, string>> = {
  readproperty: "GET",
  writeproperty: "PUT",
  invokeaction: "POST",
  readallproperties: "GET",
  writeallproperties: "PUT",
  readmultipleproperties: "GET",
  writemultipleproperties: "PUT",
};

export function isSupportedForm(
  thing: Thing,
  sourceUrl: string,
  form: Form,
): boolean {
  let url = form.href;
  const baseUrl = thing.base || sourceUrl;
  if (isRelativeUrl(url)) {
    url = urlJoin(baseUrl, url);
  }

  // For now, we can only execute http/s forms.
  return url.startsWith("http://") || url.startsWith("https://");
}

export async function executeForm(
  thing: Thing,
  sourceUrl: string,
  form: Form,
  op: FormOp,
  body?: any,
): Promise<any> {
  let url = form.href;
  const baseUrl = thing.base || sourceUrl;
  if (isRelativeUrl(url)) {
    url = urlJoin(baseUrl, url);
  }

  // TODO: htv:headers, uriVariables
  // https://www.w3.org/TR/wot-binding-templates/#http-vocabulary-terms

  // TODO: define htv method on Form, as the official spec includes it by default
  // TODO: expand definition and get from IRI, in case the def is using a different prefix.
  let method = (form as any)["htv:methodName"];
  if (!method) {
    method = DefaultHttpMethodsByOp[op];
  }
  if (!method) {
    throw new Error(
      "Cannot execute form: Unable to determine what HTTP method to use.",
    );
  }

  if (form.contentType && form.contentType !== "application/json") {
    throw new Error(
      `Cannot execute form: Cannot accept content type "${form.contentType}".`,
    );
  }

  const request: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {},
  };

  if (body != undefined) {
    request.body = JSON.stringify(body);
    request.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, request);
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const responseBody = await response.json();
  return responseBody;
}
