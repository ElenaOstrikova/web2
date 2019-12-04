import { Actions } from "../actions/locationActions";
import { extractWeatherParams } from "../api";


export default function locationReducer(state, action) {
  state = {
    ...state,
    error: false
  };

  switch (action.type) {
    case Actions.SET_GEOLOCATION:
      state.coords = action.payload;
      break;
    
    case Actions.GET_LOCATION_SUCCESS:
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
