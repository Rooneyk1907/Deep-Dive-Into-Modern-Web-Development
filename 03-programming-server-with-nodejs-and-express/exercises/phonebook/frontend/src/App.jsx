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
	const [notificationType, setNotificationType] = useState(null)
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	useEffect(() => {
		personsService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
			.catch((err) => console.log('error', err))
	}, [])

	// console.log('persons after useEffect: ', persons)

	const filterHandler = (e) => {
		setFilter(e.target.value)
	}

	const deleteHandler = (name, id) => {
		personsService
			.remove(name, id)
			.then(() => {
				setPersons(persons.filter((person) => person.id !== id))
				setNotificationMessage(`Removed ${name}`)
				setTimeout(() => {
					setNotificationMessage(null)
					setNotificationType('success')
				}, 5000)
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

	const addPersons = (e) => {
		e.preventDefault()

		const personObject = {
			name: newName,
			number: newNumber,
		}

		// console.log('personObject: ', personObject)

		const existingName = persons.find((person) => person.name === newName)
		// console.log('existingName: ', existingName)

		// console.log('persons: ', persons)
		if (existingName) {
			const updatedEntry = { ...existingName, number: newNumber }

			personsService
				.update(updatedEntry, newNumber)
				.then((returnedPerson) => {
					// console.log(returnedPerson)
					// setPersons(persons)
					// console.log('pre-map: ', persons)
					setPersons(
						persons.map((person) =>
							person.name !== returnedPerson.name ? person : returnedPerson
						)
					)
					setNotificationType('success')
					setNotificationMessage(
						`Updated ${returnedPerson.name} with new number: ${returnedPerson.number}`
					)
					setTimeout(() => {
						setNotificationType(null)
						setNotificationMessage(null)
					}, 5000)
				})
				.catch((error) => {
					setNotificationType('error')
					setNotificationMessage(
						`Information of ${personObject.name} has already been removed from server`
					)
					setTimeout(() => {
						setNotificationMessage(null)
						setNotificationType(null)
					}, 5000)
				})
		} else {
			personsService
				.create(personObject)
				.then((returnedPersons) => {
					setPersons((persons) => persons.concat(returnedPersons))
					setNotificationType('success')
					setNotificationMessage(`Added ${personObject.name}`)
					setTimeout(() => {
						setNotificationMessage(null)
					}, 5000)
				})
				.catch((error) => {
					setNotificationType('error')
					setNotificationMessage(error.response.data.error)
					setTimeout(() => {
						setNotificationType(null)
						setNotificationMessage(null)
					}, 5000)
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const filteredPersons = persons.map((person) => {
		if (person.name !== undefined || null) {
			const name = person.name
			return name.toLowerCase().includes(filter.toLowerCase()) && person
		}
	})

	// console.log('filtered persons: ', filteredPersons)

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
					addPersons={addPersons}
					setNewName={setNewName}
					newName={newName}
					setNewNumber={setNewNumber}
					newNumber={newNumber}
				/>
				<h2>Numbers</h2>
				<Persons persons={filteredPersons} deleteHandler={deleteHandler} />
			</div>
		</>
	)
}

export default App
