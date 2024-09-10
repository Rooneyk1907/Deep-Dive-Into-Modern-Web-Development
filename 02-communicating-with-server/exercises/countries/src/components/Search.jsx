/* eslint-disable react/prop-types */
const Search = ({
	countrySearch,
	setCountrySearch,
	selectedCountry,
	setSelectedCountry,
}) => {
	return (
		<>
			<div>
				find countries
				<input
					type='text'
					value={countrySearch}
					onChange={(e) => {
						selectedCountry !== '' ? setSelectedCountry('') : null
						setCountrySearch(e.target.value)
					}}
				/>
			</div>
		</>
	)
}

export default Search
