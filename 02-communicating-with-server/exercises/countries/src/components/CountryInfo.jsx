/* eslint-disable react/prop-types */
import ShowButton from './ShowButton'

const CountryInfo = ({
	filteredCountries,
	setFilteredCountry,
	countrySearch,
	setCountrySearch,
	setSelectedCountry,
}) => {
	if (countrySearch === '') {
		return <div>Please search for a country</div>
	} else if (filteredCountries.length > 10) {
		return <div>Too many matches, specify another filter</div>
	} else if (2 <= filteredCountries.length) {
		return (
			<div>
				{filteredCountries.map((country) => (
					<div key={country.name.common}>
						<div>
							{country.name.common}{' '}
							<ShowButton
								country={country}
								setSelectedCountry={setSelectedCountry}
								setCountrySearch={setCountrySearch}
								setFilteredCountry={setFilteredCountry}
							/>
						</div>
					</div>
				))}
			</div>
		)
		// WHEN TYPING THE NAME, THE FOLLOWING DISPLAYS. WHEN CLICKING THE SHOW BUTTON, ONLY THE WEATHER SHOWS
	} else if (filteredCountries.length === 1) {
		const { name, area, languages, flags } = filteredCountries[0]
		return (
			<>
				<div key={name.common}>
					<h1>{name.common}</h1>

					<p>area {area}</p>
					<h2>languages:</h2>
					<ul>
						{Object.values(languages).map((language, index) => (
							<li key={index}>{language}</li>
						))}
					</ul>
					<img
						src={flags.png}
						alt={flags.alt}
						style={{ padding: 0, border: 'solid' }}
					/>
				</div>
			</>
		)
	}
}

export default CountryInfo
