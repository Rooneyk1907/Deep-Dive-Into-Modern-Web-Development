import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newPerson) => {
	console.log('newPerson: ', newPerson)
	const request = axios.post(baseUrl, newPerson)
	console.log('request in frontend ', request)
	return request.then((response) => response.data)
}

const remove = (name, id) => {
	if (window.confirm(`Delete ${name}?`)) {
		const request = axios.delete(`${baseUrl}/${id}`)
		console.log(request)
		return request.then((response) => response.data)
	}
}

const update = (person) => {
	if (
		window.confirm(
			`${person.name} is already added to phonebook, replace the old number with the new one?`
		)
	) {
		// console.log('updated Person: ', updatedPerson)
		const request = axios.put(`${baseUrl}/${person.id}`, person)
		// console.log('request', request)
		return request.then((response) => response.data)
	}
}
export default { getAll, create, remove, update }
