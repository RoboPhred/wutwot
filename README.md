# WutWot

WutWot is a plugin-driven Web of Things api provider.

WutWot involves multiple parts that come together to provide a [W3C Web of Things](https://www.w3.org/TR/wot-thing-description/) API for plugin-provided devices.

- [WutWot Core](/packages/@wutwot/core): The core thing provider and plugin manager
- [WutWot Server](/packages/wutwot-server): A RESTful server exposing the (Mozilla WOT)[https://iot.mozilla.org/wot] flavor of HTML API bindings.

## Plugins or Bust

WutWot operates on the principle of maximum extensibility. All behavior is defined by plugins:

- Things are created by plugins
- Plugins can create affoardances (actions, events, and properties) for other things, including things not their own.
- Plugins can expose services and metadata to other plugins.

## Further Development Needed

WutWot is still in the early stages of development.

Currently, Core is fairly fleshed out. However, it will continue to expand as more use cases are discovered through dogfooding a home automation system.

See the various TODO files scattered across the projects.
