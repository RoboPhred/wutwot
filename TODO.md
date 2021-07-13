# TODO

## Allow plugin specific services to be injected.

Previously, we had private and public services, and injected plugin specific services into the private container.
However, this was not tenuable, as it meant public services could not consume private services.
We should come up with a way to tag what plugin provided a binding, and inject plugin specific services based on that tag.

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

### Provide management actions as actions on the root thing.

Thing Discovery relies on having a root thing. We should be able to attach management actions to this, such as creating scenes or setting zwave to inclusion mode.

## Security scheme providers

Currently, security schemes are hard coded in binding-http. Make core handle this, like forms.

## Targeted security

It should be possible to target different things and affordances with different security mechanisms.
A grants mechanism would be a start, but might not be enough. Specific security mechanisms might be applied to individual affordances.
This comes into play particularly with `nosec`, as some things might be publically available. Additionally, some interactions on a thing might be
publically accessable while other interactions require authentication.

On the surface, this seems to be different than a grants system. They might be reconcilable if security providers indicate what grants they provide, and core matches thing / affordance grants to specific providers.
