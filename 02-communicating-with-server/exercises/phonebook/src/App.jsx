/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [filter, setFilter] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationType, setNotificationType] = useState('success')

	useEffect(() => {
		personsService.getAll().then((initialPersons) => setPersons(initialPersons))
	}, [])

	const filterHandler = (e) => {
		setFilter(e.target.value.toLowerCase())
	}

	const deleteHandler = (name, id) => {
		personsService
			.remove(name, id)
			.then(() => {
				setPersons(persons.filter((person) => person.id !== id))
				setNotificationMessage(`Removed ${name}`)
			})
			.catch((error) => {
				setNotificationType('error')
				setNotificationMessage(
					`Information of ${name} has already been removed from server`
				)
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationType('success')
				}, 5000)
			})
	}

	const filteredPersons = persons.map(
		(person) => person.name.toLowerCase().includes(filter) && person
	)

	return (
		<>
			<div>
				<h2>Phonebook</h2>
				<Notification
					message={notificationMessage}
					notificationType={notificationType}
				/>
				<Filter filter={filter} filterHandler={filterHandler} />
				<h2>add a new</h2>
				<PersonForm
					persons={persons}
					setPersons={setPersons}
					setNotificationMessage={setNotificationMessage}
					setNotificationType={setNotificationType}
				/>
				<h2>Numbers</h2>
				<Persons persons={filteredPersons} deleteHandler={deleteHandler} />
			</div>
		</>
	)
}

export default App
