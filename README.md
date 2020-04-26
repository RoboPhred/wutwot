# WutWot

WutWot is a plugin-driven Web of Things api provider.

WutWot involves multiple parts that come together to provide a [W3C Web of Things](https://www.w3.org/TR/wot-thing-description/) API for plugin-provided devices.

- [Core](/packages/wutwot-core): The core thing provider and plugin manager.
- [TD](/packages/wutwot-td): Typescript typings and utilities for W3C WOT Thing Descriptions.
- [Express Servient](/packages/wutwot-servient-express): A plugin providing express router and controller capabilities to WutWot plugins.
- [Express Bindings](/packages/wutwot-binding-express): A plugin providing a directory of things and REST bindings through express.
- [ZWave](/packages/wutwot-zwave): Z-Wave thing provider plugin.
- [Scenes](/packages/wutwot-scenes): A plugin providing things to create scenes that can trigger property changes based on events.
- [Server](/packages/wutwot-server): A host application providing z-wave things and http bindings.
- [Explorer](/packages/wutwot-explorer): A webapp providing thing inspection and manipulation for arbitrary thing definition sources.

## Plugins or Bust

WutWot operates on the principle of maximum extensibility. All behavior is defined by plugins:

- Things are created by plugins
- Plugins can create affordances (actions, events, and properties) for other things, including things not their own.
- Plugins can expose services and metadata to other plugins.

## Further Development Needed

WutWot is still in the early stages of development.

Currently, Core is fairly fleshed out. However, it will continue to expand as more use cases are discovered through dogfooding a home automation system.

See the various TODO files scattered across the projects.
