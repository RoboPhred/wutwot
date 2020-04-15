import {
  compose,
  createStore as createReduxStore,
  applyMiddleware
} from "redux";

import createSagaMiddleware from "redux-saga";

import { defaultAppState } from "@/state";

import {
  actionSanitizer,
  stateSanitizer,
  actionsBlacklist
} from "./devtool-sanitizer";

import reducer from "./reducer";
import saga from "./saga";

function createStore() {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer,
        actionsBlacklist
      })) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createReduxStore(
    reducer,
    defaultAppState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(saga);

  return store;
}

const store = createStore();
export default store;
