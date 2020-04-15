# TODO

## Bindings as plugins

Should support various bindings. The most immediately useful are:

- HTTP
- Websocket
- MQTT

## Separate TD hosting / generation from server executable

Should be able to grab the module to generate TDs and expose it manually
with express, without having to use the self-contained server.

## Who is responsible for json-ld?

Currently, server handles json-ld context and serialization, but
perhaps core should do so. Core should support attaching other ld contextual props.
