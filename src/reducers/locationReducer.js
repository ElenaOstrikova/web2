import { Actions } from "../actions/locationActions";
import { extractWeatherParams } from "../api";


export default function geoReducer(state, action) {
  state = {
    ...state,
  };

  switch (action.type) {
    case Actions.SET_GEOLOCATION:
      state.error = false;
      state.coords = action.payload;
      break;

    case Actions.GET_LOCATION_SUCCESS:
      state.error = false;
      state.forecast = extractWeatherParams(action.payload);
      break;

    case Actions.GET_LOCATION_ERROR:
      state.error = action.payload;
      break;

    default:
      break;
  }

  return state;
}