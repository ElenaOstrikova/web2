export const API_URL = "http://localhost:3001";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

export function getIconURL(iconCode) {
    return `${API_ICON_URL}${iconCode}.png`;
}

export function extractWeatherParams(apiResponse) {
    const {
        coord: coords,
        weather: [{ icon, description }],
        main: {
            temp: temperature,
            pressure,
            humidity
        },
        wind: {
            speed: windSpeed
        },
        name: cityName
    } = apiResponse;

    return {
        cityName,
        temperature,
        pressure,
        humidity,
        windSpeed,
        icon,
        description,
        coords
    }
}