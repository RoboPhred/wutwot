export default {
  td: "https://www.w3.org/2019/wot/td#",
  jsonschema: "https://www.w3.org/2019/wot/json-schema#",
  wotsec: "https://www.w3.org/2019/wot/security#",
  hctl: "https://www.w3.org/2019/wot/hypermedia#",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  "@vocab": "https://www.w3.org/2019/wot/hypermedia#",
  Link: {
    "@id": "hctl:Link",
  },
  Form: {
    "@id": "hctl:Form",
  },
  scopes: {
    "@id": "wotsec:scopes",
  },
  security: {
    "@id": "td:hasSecurityConfiguration",
    "@type": "@id",
  },
  op: {
    "@id": "hctl:hasOperationType",
    "@type": "@vocab",
  },
  readproperty: "td:readProperty",
  writeproperty: "td:writeProperty",
  observeproperty: "td:observeProperty",
  observeallproperties: "td:observeAllProperties",
  unobserveproperty: "td:unobserveProperty",
  unobserveallproperties: "td:unobserveAllProperties",
  invokeaction: "td:invokeAction",
  subscribeevent: "td:subscribeEvent",
  unsubscribeevent: "td:unsubscribeEvent",
  readallproperties: "td:readAllProperties",
  writeallproperties: "td:writeAllProperties",
  readmultipleproperties: "td:readMultipleProperties",
  writemultipleproperties: "td:writeMultipleProperties",
  subprotocol: {
    "@id": "hctl:forSubProtocol",
  },
  contentType: {
    "@id": "hctl:forContentType",
  },
  contentCoding: {
    "@id": "hctl:forContentCoding",
  },
  anchor: {
    "@id": "hctl:hasAnchor",
    "@type": "@id",
  },
  sizes: {
    "@id": "hctl:hasSizes",
    "@type": "@id",
  },
  href: {
    "@id": "hctl:hasTarget",
    "@type": "@id",
  },
  rel: {
    "@id": "hctl:hasRelationType",
    "@type": "@vocab",
  },
  type: {
    "@id": "hctl:hintsAtMediaType",
  },
  response: {
    "@id": "hctl:returns",
  },
  additionalResponses: {
    "@id": "hctl:additionalReturns",
  },
  schema: {
    "@id": "hctl:hasAdditionalOutputSchema",
    "@type": "@id",
  },
  success: {
    "@id": "hctl:isSuccess",
  },
};
