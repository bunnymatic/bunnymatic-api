import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../react/reducers";
import ReduxStore from "uppy/lib/store/ReduxStore";
import Uppy from "uppy/lib/core";

export default function configureStore(initialState) {
  const middlewares = [thunk];

  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger());

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}
