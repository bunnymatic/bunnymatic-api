import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "../react/sagas";
import reducers from "../react/reducers";
import ReduxStore from "uppy/lib/store/ReduxStore";
import Uppy from "uppy/lib/core";

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger());

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  (sagas && sagas.length && sagas.forEach(saga => sagaMiddleware.run(saga)));

  return store;
}
