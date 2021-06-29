# TODO

#### Consider seperating directory and binding

Currently, this binding supplies a `/things` endpoint that returns an array of all things.
Thing discovery is not specified by the spec, and we should decouple it from bindings, which are.

We should use [Thing Discovery](https://www.w3.org/TR/wot-discovery/) for this.
(Currently, they use a Thing to list the other things. There is debate around exposing the thing list as a thing property or as a link).
See: https://github.com/w3c/wot-discovery/issues/172

#### Forms

Provide forms for affordances.

Consider making Forms into a mechanism in @wutwot/core so other bindings can know of all forms.
This is in progress. Currently implemented for Properties
