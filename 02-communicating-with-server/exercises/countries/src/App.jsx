import { useState, useEffect } from 'react'

import Search from './components/Search'
import CountryInfo from './components/CountryInfo'
import Weather from './components/Weather'

import countrySearchService from './services/countrySearch'
import weatherService from './services/weather'
import NewSearch from './components/NewSearch'

function App() {
	const [countrySearch, setCountrySearch] = useState('')
	const [countries, setCountries] = useState(null)
	const [filteredCountries, setFilteredCountries] = useState('')
	const [selectedCountry, setSelectedCountry] = useState('')
	const [weatherData, setWeatherData] = useState('')

	useEffect(() => {
		countrySearchService
			.getAll()
			.then((res) => {
				setCountries(res)
			})
			.catch((err) => console.log('error: ', err))
	}, [])

	useEffect(() => {
		if (countries) {
			const countryArray = countries.map((country) => country)
			setFilteredCountries(
				countryArray.filter((country) =>
					country.name.common
						.toLowerCase()
						.includes(countrySearch.toLowerCase())
				)
			)
			if (countryArray.length === 1) {
				setFilteredCountries(countryArray)
			}
		}
		if (selectedCountry) {
			setFilteredCountries(
				countries.find((country) => country.name.common === selectedCountry)
			)
		}
	}, [countrySearch, countries, selectedCountry])

	useEffect(() => {
		if (selectedCountry && filteredCountries.length > 1) {
			setFilteredCountries(
				countries.filter((country) => country.name.common === selectedCountry)
			)
		}
	}, [selectedCountry, filteredCountries, countries])

	useEffect(() => {
		if (filteredCountries.length === 1) {
			const { latlng } = filteredCountries[0]
			const lat = latlng[0]
			const lon = latlng[1]

			weatherService
				.open_weather(lat, lon)
				.then((res) => {
					setWeatherData(res)
				})
				.catch((err) => console.log('error: ', err))
		}
	}, [filteredCountries])

	if (!countries) {
		return <div>Loading...</div>
	}
	return (
		<>
			<Search
				countrySearch={countrySearch}
				setCountrySearch={setCountrySearch}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
			/>
			<NewSearch
				setCountrySearch={setCountrySearch}
				setWeatherData={setWeatherData}
				setSelectedCountry={setSelectedCountry}
			/>
			<CountryInfo
				countrySearch={countrySearch}
				filteredCountries={filteredCountries}
				setCountrySearch={setCountrySearch}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
			/>
			{/* <p>Filtered Countries = {filteredCountries.name}</p> */}

			<Weather
				filteredCountries={filteredCountries}
				weatherData={weatherData}
				setWeatherData={setWeatherData}
			/>
		</>
	)
}

export default App
