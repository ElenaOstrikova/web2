export const API_URL = "https://api.openweathermap.org/data/2.5/weather";
export const API_PARAMETERS = "&appid=f59d11cd1cbf21b585ceaf6740b123a4&units=metric&lang=en"
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
