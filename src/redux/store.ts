import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { ShapeReducer } from "./reducers/shape.reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  shape: ShapeReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware()));

export type AppState = ReturnType<typeof reducers>;
