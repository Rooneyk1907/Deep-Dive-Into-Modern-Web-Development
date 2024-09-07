import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		personsService.getAll().then((initialPersons) => setPersons(initialPersons))
	}, [])

	// console.log('render', persons.length, 'persons')

	const filterHandler = (e) => {
		setFilter(e.target.value.toLowerCase())
	}

	const deleteHandler = (name, id) => {
		personsService.remove(name, id).then(() => {
			setPersons(persons.filter((person) => person.id !== id))
		})
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
				<Persons persons={filteredPersons} deleteHandler={deleteHandler} />
			</div>
		</>
	)
}

export default App
