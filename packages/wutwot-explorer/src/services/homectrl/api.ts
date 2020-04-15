import { Thing } from "./types/Thing";

const API_ROOT = process.env.HOMECTRL_API_URL;

export async function getThings(): Promise<Thing[]> {
  const response = await fetch(`${API_ROOT}/things`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result as Thing[];
}

export async function getThing(thingId: string): Promise<Thing> {
  // Thing ids are full urls.
  // Verify that it is for us.
  if (!isHomectrlThingUrl(thingId)) {
    throw new Error("ThingId is not a valid homectrl url.");
  }

  const response = await fetch(thingId);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result as Thing;
}

export async function getThingPropertyValue(
  thingId: string,
  propertyId: string
): Promise<any> {
  if (!isHomectrlThingUrl(thingId)) {
    throw new Error("ThingId is not a valid homectrl url.");
  }

  const response = await fetch(`${thingId}/properties/${propertyId}`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result[propertyId];
}

export async function setThingPropertyValue(
  thingId: string,
  propertyId: string,
  value: any
): Promise<any> {
  if (!isHomectrlThingUrl(thingId)) {
    throw new Error("ThingId is not a valid homectrl url.");
  }

  const response = await fetch(`${thingId}/properties/${propertyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      [propertyId]: value
    })
  });
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result[propertyId];
}

function isHomectrlThingUrl(url: string): boolean {
  return url.startsWith(`${API_ROOT}/things/`);
}
