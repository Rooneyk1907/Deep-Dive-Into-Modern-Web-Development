/* eslint-disable react/prop-types */
const Weather = ({ filteredCountries, weatherData }) => {
	if (weatherData && filteredCountries.length === 1) {
		const { capital } = filteredCountries[0]
		const { icon } = weatherData.weather[0]
		return (
			<div key={weatherData.weather.id}>
				<h1>Weather in {capital}</h1>
				<p>temperature {(weatherData.main.temp - 273).toFixed(2)} &deg;C </p>

				<img
					src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
					alt={weatherData.weather.description}
				/>
				<p>wind {weatherData.wind.speed} m/s</p>
			</div>
		)
	} else {
		return null
	}
}

export default Weather
