# TODO

#### Consider seperating directory and binding

Currently, this binding supplies a `/things` endpoint that returns an array of all things.
Thing discovery is not specified by the spec, and we should decouple it from bindings, which are.

#### Forms

Provide forms for affordances.

Consider making Forms into a mechanism in @wutwot/core so other bindings can know of all forms.
