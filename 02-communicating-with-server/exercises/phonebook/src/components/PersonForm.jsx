/* eslint-disable react/prop-types */
import { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const addPersons = (e) => {
		e.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
		};

		const nameExists = persons.find((person) => person.name === newName);

		nameExists
			? alert(`${newName} is already added to phonebook`)
			: setPersons(persons.concat(personObject));

		setNewName('');
	};
	return (
		<form onSubmit={addPersons}>
			<div>
				name:{' '}
				<input
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
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
	);
};

export default PersonForm;
