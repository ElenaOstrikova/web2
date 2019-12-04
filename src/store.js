import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import favoriteReducer from "./reducers/favoriteReducer";
import locationReducer from "./reducers/locationReducer";
import { LOCAL_STORAGE_KEY } from "./localStorage";


const store = createStore(
  combineReducers({fav: favoriteReducer, geo: locationReducer}),
  applyMiddleware(logger, thunk)
);

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...store.getState().fav.favorites.keys()]));
});


export default store;
