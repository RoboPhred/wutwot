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
  const response = await fetch(`${API_ROOT}/things/${thingId}`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result as Thing;
}
