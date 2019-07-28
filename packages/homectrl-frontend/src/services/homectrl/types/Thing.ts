export interface Thing {
  "@type": string[];
  id: string;
  title: string;
  description: string;
  properties: Record<string, ThingProperty>;
}

export interface ThingProperty {
  "@type"?: string;
  type: string;
  title: string;
  description?: string;
  minimum?: number;
  maximum?: number;
}
