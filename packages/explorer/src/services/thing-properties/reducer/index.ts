import { concatReducers } from "@/store/utils";

import thingPropertyObservationsReceived from "./thing-property-observations-received";
import thingPropertyObserveReducer from "./thing-property-observe";
import thingPropertyUnobserveReducer from "./thing-property-unobserve";

export default concatReducers(
  thingPropertyObservationsReceived,
  thingPropertyObserveReducer,
  thingPropertyUnobserveReducer,
);
