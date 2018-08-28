# service

A class or series of classes providing services to the outside world.
A dependency injection boundary. Components inside a service share the same DI container,
but the inside and the outside of the service will not share the same container.

# component

A component making up part of the logic of a service. These are registered
with the DI container but are not exposed publically.

# contract

A public interface / api intended to be implemented externally and passed to the service.

# type

Public types intended for use inside and outside the service.
