# TODO

## Major Bug: public services cannot access private services

Attempting to fix this by removing the concept of public and private services, and scoping plugin thing creation under plugin.
However, this is not workable, as plugins can provide singleton services that then need to create the plugin things. As they are
singleton services, they exist outside the plugin scope, and are unable to find the scope root for the Plugin.

Also explored allowing microinject to take an overriding ServiceLocator in a binding, to let public container bindings
access private services. However, that rapidly became a mess and seemed unworkable.

First thing I tried was allowing access to private service locator while binding public services, and to then bind the public
services as factories that take from the private service. This did not work, as the items instantiated in the private services
themselves might want other public services.

## Provide thing discovery

Currently, this binding supplies a `/things` endpoint that returns an array of all things.
However, this isnt part of the spec, and is specific to us.

Instead, use [Thing Discovery](https://www.w3.org/TR/wot-discovery/).
(Currently, they use a Thing to list the other things. There is debate around exposing the thing list as a thing property or as a link).
See: https://github.com/w3c/wot-discovery/issues/172

The directory thing can self advertise our discovered thing a directory using mdns (javascript advertiser is here: https://www.npmjs.com/package/nbonjour)

Problem: WoT Thing Discovery claims any directory MUST allow others to upload and modify custom TDs. We cannot do that, as we are an authoritative source of our own things and third parties
should not be able to modify them.
See https://github.com/w3c/wot-discovery/issues/208

## Security scheme providers

Currently, security schemes are hard coded in binding-http. Make core handle this, like forms.

## Targeted security

It should be possible to target different things and affordances with different security mechanisms.
A grants mechanism would be a start, but might not be enough. Specific security mechanisms might be applied to individual affordances.
This comes into play particularly with `nosec`, as some things might be publically available. Additionally, some interactions on a thing might be
publically accessable while other interactions require authentication.

On the surface, this seems to be different than a grants system. They might be reconcilable if security providers indicate what grants they provide, and core matches thing / affordance grants to specific providers.
