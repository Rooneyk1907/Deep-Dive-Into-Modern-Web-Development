import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	// const [filteredPersons, setFilteredPersons] = useState();
	const [filter, setFilter] = useState('');

	console.log('filter in App: ', filter);
	console.log('persons:', persons);

	const filterHandler = (e) => {
		setFilter(e.target.value.toLowerCase());
	};

	console.log('filter in Filter: ', filter);

	const filteredPersons = persons.map(
		(person) => person.name.toLowerCase().includes(filter) && person,
	);

	// console.log('filteredPersons in App.js', filteredPersons);

	return (
		<>
			<div>
				<h2>Phonebook</h2>
				<Filter
					filter={filter}
					filterHandler={filterHandler}
				/>
				<h2>add a new</h2>
				<PersonForm
					persons={persons}
					setPersons={setPersons}
				/>
				<h2>Numbers</h2>
				<Persons persons={filteredPersons} />
			</div>
		</>
	);
};

export default App;
