import { API_URL } from "../api"


export const Actions = {
  GET_FAVORITES_SUCCESS: "GET_FAVORITES_SUCCESS",
  GET_FAVORITES_ERROR: "GET_FAVORITES_ERROR",
  ADD_FAVORITE: "ADD_FAVORITE",
  ADD_FAVORITE_SUCCESS: "ADD_FAVORITE_SUCCESS",
  ADD_FAVORITE_ERROR: "ADD_FAVORITE_ERROR",
  DELETE_FAVORITE_SUCCESS: "DELETE_FAVORITE_SUCCESS",
  DELETE_FAVORITE_ERROR: "DELETE_FAVORITE_ERROR",
  FETCH_FAV_SUCCESS: "FETCH_FAV_SUCCESS",
  FETCH_FAV_ERROR: "FETCH_FAV_ERROR"
}


export function getFavorites() {
  const url = `${API_URL}/favourites`;

  return async function (dispatch) {
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (response.ok)
        dispatch(getFavoritesSuccess(json));
      else
        dispatch(getFavoritesError(json.message));
    } catch (error) {
      dispatch(getFavoritesError(error.message));
    }
  }
}

function getFavoritesSuccess(cities) {
  return {
    type: Actions.GET_FAVORITES_SUCCESS,
    payload: cities
  };
}

function getFavoritesError(error) {
  return {
    type: Actions.GET_FAVORITES_ERROR,
    payload: error
  };
}

export function addFavorite(cityName) {
  const url = `${API_URL}/favourites`;
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName })
  };

  return async function (dispatch) {
    dispatch({
      type: Actions.ADD_FAVORITE,
      payload: cityName
    });

    try {
      const response = await fetch(url, fetchOptions);
      const json = await response.json();

      if (response.ok)
        dispatch(addFavoriteSuccess(cityName, json.forecast));
      else
        dispatch(addFavoriteError(cityName, json.message));
    } catch (error) {
      dispatch(addFavoriteError(cityName, error.message));
    }
  }
}

function addFavoriteSuccess(cityName, apiResponse) {
  return {
    type: Actions.ADD_FAVORITE_SUCCESS,
    payload: {
      cityName,
      apiResponse
    }
  };
}

function addFavoriteError(cityName, error) {
  return {
    type: Actions.ADD_FAVORITE_ERROR,
    payload: {
      cityName,
      error
    }
  };
}


export function deleteFavorite(cityName) {
  const url = `${API_URL}/favourites`;
  const fetchOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  };

  return async function(dispatch) {
    try {
      const response = await fetch(url, fetchOptions);
      const json = response.json();

      if (response.ok)
        dispatch(deleteFavoriteSuccess(cityName));
      else
        dispatch(deleteFavoriteError(json.message));
    } catch (error) {
      dispatch(deleteFavoriteError(error.message));
    }
  }
}

function deleteFavoriteSuccess(cityName) {
  return {
    type: Actions.DELETE_FAVORITE_SUCCESS,
    payload: cityName
  };
}

function deleteFavoriteError(error) {
  return {
    type: Actions.DELETE_FAVORITE_ERROR,
    payload: error
  };
}

export function fetchWeatherByCityName(cityName) {
  const url = `${API_URL}/weather?cityName=${cityName}`;

  return async function(dispatch) {
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (response.ok) {
        dispatch(fetchFavSuccess(cityName, json));
      } else {
        dispatch(fetchFavError(cityName, json.message));
      }
    } catch (error) {
      dispatch(fetchFavError(cityName, error.message));
    }
  }
}

function fetchFavSuccess(cityName, apiResponse) {
  return {
    type: Actions.FETCH_FAV_SUCCESS,
    payload: {
      cityName,
      apiResponse
    }
  }
}

function fetchFavError(cityName, error) {
  return {
    type: Actions.FETCH_FAV_ERROR,
    payload: {
      cityName,
      error
    }
  }
}