#### Provide thing discovery

Currently, this binding supplies a `/things` endpoint that returns an array of all things.
However, this isnt part of the spec, and is specific to us.

Instead, use [Thing Discovery](https://www.w3.org/TR/wot-discovery/).
(Currently, they use a Thing to list the other things. There is debate around exposing the thing list as a thing property or as a link).
See: https://github.com/w3c/wot-discovery/issues/172

The directory thing can self advertise our discovered thing a directory using mdns (javascript advertiser is here: https://www.npmjs.com/package/nbonjour)

Problem: WoT Thing Discovery claims any directory MUST allow others to upload and modify custom TDs. We cannot do that, as we are an authoritative source of our own things and third parties
should not be able to modify them.
See https://github.com/w3c/wot-discovery/issues/208
