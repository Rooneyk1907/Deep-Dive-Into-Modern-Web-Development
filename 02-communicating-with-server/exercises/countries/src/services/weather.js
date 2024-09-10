import axios from 'axios'
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_TOKEN


const open_weather = (lat, lon) => {
	return axios
		.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
		)
		.then((res) => {
			return res.data
		})
		.catch((err) => console.log(err.message))
}

export default { open_weather }
