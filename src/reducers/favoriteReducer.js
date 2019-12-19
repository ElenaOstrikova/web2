import { Actions } from "../actions/favoriteActions";
import { extractWeatherParams } from "../api";

const initialState = {
  favorites: new Map()
};

export default function favReducer(state = initialState, action) {
  state = {
    ...state,
    favorites: new Map(state.favorites)
  };

  switch (action.type) {
    case Actions.GET_FAVORITES_SUCCESS:
      //state.error = false;
      for (const city of action.payload)
        state.favorites.set(city.cityName, false);
      break;

    case Actions.GET_FAVORITES_ERROR:
      state.error = action.payload;
      break;

    case Actions.ADD_FAVORITE:
      if (!state.favorites.has(action.payload))
        state.favorites.set(action.payload);
      break;

    case Actions.ADD_FAVORITE_SUCCESS:
      updateFavorite(state, action.payload.cityName, action.payload.apiResponse);
      break;

    case Actions.ADD_FAVORITE_ERROR:
      state.error = action.payload.error;
      state.favorites.delete(action.payload.cityName);
      break;

    case Actions.DELETE_FAVORITE_SUCCESS:
      state.favorites.delete(action.payload);
      break;

    case Actions.DELETE_FAVORITE_ERROR:
      state.error = action.payload;
      break;

    case Actions.FETCH_FAV_SUCCESS:
      updateFavorite(state, action.payload.cityName, action.payload.apiResponse);
      break;

    case Actions.FETCH_FAV_ERROR:
      state.error = action.payload.error;
      state.favorites.delete(action.payload.cityName);
      break;

    default:
      break;
  }

  return state;
}


function updateFavorite(state, oldCityName, apiResponse) {
  const forecast = extractWeatherParams(apiResponse);
  if (oldCityName !== forecast.cityName)
    state.favorites.delete(oldCityName);
  state.favorites.set(forecast.cityName, forecast);
}