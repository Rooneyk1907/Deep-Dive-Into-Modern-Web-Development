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
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	useEffect(() => {
		personsService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons))
			.catch((err) => console.log('error', err))
	}, [])

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

		console.log('add Person: ', personObject)

		const nameExists = persons.find((person) => person.name === newName)

		console.log('persons: ', persons)

		if (nameExists) {
			const personToUpdate = { ...nameExists }

			console.log('person to update: ', personToUpdate)
			console.log('New Number: ', newNumber)
			personsService
				.update(personToUpdate, newNumber)
				.then((returnedPerson) => {
					// console.log(returnedPerson)
					// setPersons(persons)
					// console.log('pre-map: ', persons)
					setPersons(
						persons.map((person) =>
							person.name !== returnedPerson.name ? person : returnedPerson
						)
					)
					console.log(persons)
					setNotificationMessage(
						`Updated ${returnedPerson.name} with new number: ${returnedPerson.number}`
					)
					setTimeout(() => {
						setNotificationMessage(null)
					}, 5000)
				})
				.catch((error) => {
					setNotificationType('error')
					setNotificationMessage(
						`Information of ${personToUpdate.name} has already been removed from server`
					)
					setTimeout(() => {
						setNotificationMessage(null)
						setNotificationType('success')
					}, 5000)
				})
		} else {
			personsService
				.create(personObject)
				.then((returnedPersons) => {
					setPersons((persons) => persons.concat(personObject))
					setNotificationMessage(`Added ${personObject.name}`)
					setTimeout(() => {
						setNotificationMessage(null)
					}, 5000)
				})
				.catch((err) => {
					setNotificationType('error')
					setNotificationMessage(`Failed to add ${personObject.name}`)
					setTimeout(() => {
						setNotificationMessage(null)
					}, 5000)
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const filteredPersons = persons.map((person) => {
		if (person.name) {
			const name = person.name
			return name.toLowerCase().includes(filter.toLowerCase()) && person
		}
	})

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
