# WutWot

WutWot is a plugin-driven W3C Web of Things hub.

WutWot involves multiple parts that come together to provide [W3C Web of Things](https://www.w3.org/TR/wot-thing-description/) descriptions and bindings for plugin-provided devices.

- [Core](/packages/core): The core thing provider and plugin manager.
- [TD](/packages/td): Typescript typings and utilities for W3C WOT Thing Descriptions, WOT Security, JSON-Schema LD, and other IRI sources.
- [Express Servient](/packages/plugins/servient-express): A plugin providing express router and controller capabilities to WutWot plugins.
- [Express Bindings](/packages/plugins/binding-express): A plugin providing a directory of things and REST bindings through express.
- [Express WebUI](/packages/plugins/webui-express): A plugin allowing the WutWot server to self-host a preconfigured [Explorer](/packages/explorer) frontend.
- [ZWave](/packages/plugins/zwave): Z-Wave thing provider plugin.
- [Scenes](/packages/plugins/scenes): A plugin providing things to create scenes that can trigger property changes based on events.
- [Server](/packages/server): A host application providing z-wave things and http bindings.
- [Explorer](/packages/explorer): A webapp providing thing inspection and manipulation for arbitrary thing definition sources.

## Plugins or Bust

WutWot operates on the principle of maximum extensibility. All behavior is defined by plugins:

- Things are created by plugins
- Plugins can create affordances (actions, events, and properties) for other things, including things created by other plugins.
- Plugins can expose services and metadata to other plugins.

## Further Development Needed

WutWot is still in the early stages of development.

See the various TODO files scattered across the projects.
