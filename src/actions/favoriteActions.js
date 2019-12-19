import { API_URL, API_PARAMETERS } from "../api"


export const Actions = {
  ADD_FAVORITE: "ADD_FAVORITE",
  DELETE_FAVORITE: "DELETE_FAVORITE",
  GET_FAV_SUCCESS: "GET_FAV_SUCCESS",
  GET_FAV_ERROR: "GET_FAV_ERROR"
};

export function addFavorite(cityName) {
  return {
    type: Actions.ADD_FAVORITE,
    payload: cityName
  };
}

export function deleteFavorite(cityName) {
  return {
    type: Actions.DELETE_FAVORITE,
    payload: cityName
  };
}

export function getWeatherByCityName(cityName) {
  const url = `${API_URL}?q=${cityName}${API_PARAMETERS}`;
  
  return function(dispatch) {
    fetch(url)
      .then(response => {
        response.json()
          .then(json => {
            console.log(response, json);
            if (!response.ok) {
              dispatch(getFavError(json.message, cityName));
            } else {
              dispatch(getFavSuccess(json, cityName));
            }
          });
      },
      error => {
        dispatch(getFavError(error.message, cityName))})
  }
}

function getFavSuccess(apiResponse, cityName) {
  return {
    type: Actions.GET_FAV_SUCCESS,
    payload: {
      apiResponse,
      cityName
    }
  }
}

function getFavError(error, cityName) {
  return {
    type: Actions.GET_FAV_ERROR,
    payload: {
      error,
      cityName
    }
  }
}
