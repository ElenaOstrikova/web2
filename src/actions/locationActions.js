import { API_URL, API_PARAMETERS } from "../api";

export const Actions = {
    SET_GEOLOCATION: "SET_GEOLOCATION",
    GET_LOCATION_SUCCESS: "GET_LOCATION_SUCCESS",
    GET_LOCATION_ERROR: "GET_LOCATION_ERROR",
};

export function setGeolocation(coords) {
    return {
        type: Actions.SET_GEOLOCATION,
        payload: coords
    }
}

export function getWeatherByCoords(coords) {
    const url = `${API_URL}?lat=${coords.lat}&lon=${coords.lon}${API_PARAMETERS}`;

    return function(dispatch) {
        fetch(url)
            .then(response => {
                    response.json()
                        .then(json => {
                            console.log(response, json);
                            if (!response.ok) {
                                dispatch(getGeoError(json.message));
                            } else {
                                dispatch(getGeoSuccess(json));
                            }
                        });
                },
                error => {
                debugger
                dispatch(getGeoError(error.message))})
    }
}

function getGeoSuccess(apiResponse) {
    return {
        type: Actions.GET_LOCATION_SUCCESS,
        payload: apiResponse
    }
}

export function getGeoError(error) {
    return {
        type: Actions.GET_LOCATION_ERROR,
        payload: error
    }
}