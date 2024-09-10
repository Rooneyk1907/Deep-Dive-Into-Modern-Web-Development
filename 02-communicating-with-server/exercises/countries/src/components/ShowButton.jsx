/* eslint-disable react/prop-types */
const ShowButton = ({ country, setSelectedCountry, setCountrySearch }) => {
	const { common } = country.name
	return (
		<>
			<button
				onClick={() => {
					setCountrySearch(common)
					setSelectedCountry(common)
				}}>
				Show
			</button>
		</>
	)
}

export default ShowButton
