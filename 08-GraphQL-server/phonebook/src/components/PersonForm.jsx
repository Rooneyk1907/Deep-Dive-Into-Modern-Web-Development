/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import personsService from '../services/persons'

const PersonForm = ({
	persons,
	setPersons,
	setNotificationMessage,
	setNotificationType,
}) => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const addPersons = (e) => {
		e.preventDefault()
		const personObject = {
			name: newName,
			number: newNumber,
		}
		// console.log('add Person: ', personObject)

		const nameExists = persons.find((person) => person.name === newName)
		// console.log('persons: ', persons)

		nameExists
			? (() => {
					const personToUpdate = { ...nameExists }
					// console.log('person to update: ', personToUpdate)
					// console.log('New Number: ', newNumber)
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
								`Information of ${name} has already been removed from server`
							)
							setTimeout(() => {
								setNotificationMessage(null)
								setNotificationType('success')
							}, 5000)
						})
			  })()
			: personsService
					.create(personObject)
					.then((returnedPersons) => {
						setNotificationMessage(`Added ${returnedPersons.name}`)
						setTimeout(() => {
							setNotificationMessage(null)
						}, 5000)
						setPersons(persons.concat(returnedPersons))
						setNewName('')
						setNewNumber('')
					})
	}

	return (
		<form onSubmit={addPersons}>
			<div>
				name:{' '}
				<input value={newName} onChange={(e) => setNewName(e.target.value)} />
			</div>
			<div>
				number:{' '}
				<input
					value={newNumber}
					onChange={(e) => setNewNumber(e.target.value)}
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
			<div>debug: {newName}</div>
		</form>
	)
}

export default PersonForm
