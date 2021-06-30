# WutWot Server

A standalone server for running a WutWot Web of Things hub.

## Configuration

WutWot cannot do anything on its own, and needs to be provided with plugins to provide things, bindings, and a web ui.
[See available plugins](../plugins).

Plugins can be specified by the `WUTWOT_PLUGINS` environment variable. This variable is a semicolon-seperated list of nodejs plugin package names, with optional configuration.
Plugin configuration can be provided by postfixing the plugin name followed by `?`, then plugin options in a `key=value` format, seperated by `&`.

For example:
`WUTWOT_PLUGINS=@wutwot/zwave?device=/dev/zwave;@wutwot/servient-http?port=8080;@wutwot/binding-http`
