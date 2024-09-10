import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
	return axios
		.get(`${baseUrl}/all`)
		.then((res) => {
			return res.data
		})
		.catch((error) => console.log('error', error))
}
const getOne = (selectedCountry) => {
	axios
		.get(`${baseUrl}/name/${selectedCountry}`)
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			return console.log('error', err)
		})
}

export default { getAll, getOne }
