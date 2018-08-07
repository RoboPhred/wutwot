Use relation decorators to automate the endpoints:

```
@restObjectRoot('/')
ThingManager {
  @resource('things')
  get things(): ReadonlyRecord<string, Thing>
}

Thing {
  @id
  readonly id: string;

  @property
  readonly description: string;

  @resource('actions')
  get actions(): ReadonlyRecord<string, ThingAction>
}

ThingAction {
  @id
  readonly id: string;

  @resource('/')
  get requests(): ReadonlyRecord<string, ThingActionRequest>
}
```

binding config?
idea for config driven DI, possible extension to microinject

```
{
  $type: "endpoint",
  $name: "WOTEndpoint",
  controllers: [
    {
      $type: "RelationRESTController",
      root: { $type: "ThingManager" }
    }
  ]
}
```
