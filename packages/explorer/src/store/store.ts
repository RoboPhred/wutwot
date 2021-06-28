import {
  compose,
  createStore as createReduxStore,
  applyMiddleware,
} from "redux";

import createSagaMiddleware from "redux-saga";

import { defaultAppState } from "@/state";

import { initialize } from "@/actions/initialize";

import reducer from "./reducer";
import saga from "./saga";

function createStore() {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();

  const initialState = defaultAppState;

  const store = createReduxStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(saga);

  store.dispatch(initialize());

  return store;
}

const store = createStore();
export default store;
