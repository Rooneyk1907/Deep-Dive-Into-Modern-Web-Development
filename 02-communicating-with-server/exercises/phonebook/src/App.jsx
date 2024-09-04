import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		console.log('effect')
		axios.get('http://localhost:3001/persons').then((response) => {
			console.log('promise fulfilled')
			setPersons(response.data)
		})
	}, [])
	console.log('render', persons.length, 'persons')

	const filterHandler = (e) => {
		setFilter(e.target.value.toLowerCase())
	}

	const filteredPersons = persons.map(
		(person) => person.name.toLowerCase().includes(filter) && person
	)

	return (
		<>
			<div>
				<h2>Phonebook</h2>
				<Filter filter={filter} filterHandler={filterHandler} />
				<h2>add a new</h2>
				<PersonForm persons={persons} setPersons={setPersons} />
				<h2>Numbers</h2>
				<Persons persons={filteredPersons} />
			</div>
		</>
	)
}

export default App
