# TODO

#### Thing IDs are uris, but are used as url parameters

This causes chaos when ids are also urls.
Should generate local IDs from titles

#### Thing IDs are optional

Right now we generate a uuid if id is missing, but this means urls are no longer stable.
We should make an effort to stabilize the ids for things without them, based on source and thing title.
