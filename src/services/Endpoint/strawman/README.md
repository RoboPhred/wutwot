Use relation decorators to automate the endpoints:

```
@restObjectRoot('/')
ThingManager {
  @relation('things')
  get things(): Thing[] { ... }
}

Thing {
  @property
  readonly id: string;

  @relation('properties')
  get actions(): ThingAction[]
}
```
