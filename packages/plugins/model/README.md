This is an experimental plugin to provide a global name property on all things.

Few problems:

- The name is not used as the TD title. Should add support for sourcing the title from a property in core.
- Some things, like scenes, provide their own name property. We shouldn't define our name prop on things that already have one. Might make a @type IRI to represent a name prop to check for this.

This is an experiment around the issues discussed in [thing description issue 1174](https://github.com/w3c/wot-thing-description/issues/1174).
