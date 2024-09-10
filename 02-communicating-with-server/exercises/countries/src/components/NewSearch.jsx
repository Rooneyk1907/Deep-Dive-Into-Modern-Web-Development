/* eslint-disable react/prop-types */
const NewSearch = ({
	setCountrySearch,
	setSelectedCountry,
	setWeatherData,
}) => {
	return (
		<button
			onClick={() => {
				setCountrySearch('')
				setSelectedCountry('')
				setWeatherData('')
			}}>
			New Search
		</button>
	)
}

export default NewSearch
