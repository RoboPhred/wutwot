# TODO

#### Prevent data from becomming stale.

thing.properties, thing.actions, thing.events, action.requests, and event.records become stale after accessed.
Use proxy objects to create a live view into this data that remains read-only.

#### NodeJS events for individual topics

- Thing events
  - Property added / removed
  - Action added / removed
  - Event added / removed
  - Mirror events from individual actions / requests / properties / events?
    - Property updated
    - Action requested / started / cancelled / completed
    - Event raised
      Action events
- Action requestet
  - Mirror events from action requests?
    Action request events
  - started / cancelled / completed
- Property events
  - value updated
- Event events
  - event raised (new record)

#### API documentation

https://www.npmjs.com/package/@microsoft/api-extractor

#### Base classes for thing attribute services

Action / event / property services (main, repo, event source/sink) are very similar.

#### Reconsider storing everything in seperate repos vs inside their owner thing

The original intent behind keeping actions / events / properties in seperate repos was to
enforce pluggable architecture, but that isn't really needed from inside moziot and
any additional plugin conceps would need getters on the Thing class anyway.

Either support this fully by having Thing js properties be declared by plugins, or do
away with it and just store thing concerns inside the thing (and action events inside actions).

Probably want to do away with it, as the mozilla wot spec isn't going to add any new concerns,
and our management-as-thing strategy means we do not need to add additional management api.

Event sinks for concerns will not be a problem, as the Thing can take a dependency on the sink and
call the appropriate functions.

#### Persistent IDs

Store chosen IDs for all concerns in a map file and re-use them on reboot.
Need to accept a more rigerous id from plugins to do this. Keep in mind
some plugins (zwave) will have more than one facet of an id, so accept
an IDClaims interface mapping many values as a compound ID.

Will need to get rid of IDMapper and inject a more robust ID provider.
This currently lives at the factory level, and needs a new instance per thing.
More evidence that we need thing-local storage rather than global repos.
