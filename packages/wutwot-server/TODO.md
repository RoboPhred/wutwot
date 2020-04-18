# TODO

## Move td hosting and binding provider into own module.

Call it `wutwot-servient`. Should provide:

- Generation of W3C WOT ThingDescriptions
- Optionally providing Mozilla-styled endpoints for fetching things and affordances.
- Plugin system for hosting additional bindings.
  - HTTP
  - Websocket
  - MQTT
