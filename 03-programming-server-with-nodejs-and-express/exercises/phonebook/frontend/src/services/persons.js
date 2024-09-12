import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then((response) => response.data)
}

const remove = (name, id) => {
	window.confirm(`Delete ${name}?`)
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then((response) => response.data)
}

const update = (person, newNumber) => {
	const { name, id } = person
	window.confirm(
		`${name} is already added to phonebook, replace the old number with the new one?`
	)
	const updatedPerson = { name, number: newNumber, id }
	// console.log('updated Person: ', updatedPerson)
	const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
	// console.log('request', request)
	return request.then((response) => response.data)
}
export default { getAll, create, remove, update }
