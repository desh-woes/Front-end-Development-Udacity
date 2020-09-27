const tripInformation = (props) => {
    return `
    <div>
        <p id="trip-countdown">${props.trip_destination} is <span id="countdown">${props.date_diff}</span> day(s) away</p>
        <p id="weather">Typical weather for then is: </p>
        <p id="trip-weather">High - ${props.high_temp}, low - ${props.low_temp}</p>
        <p id="trip-weather-summary">Mostly ${props.weather_description} throughout the day</p>
    </div>
    `
}

export default tripInformation;