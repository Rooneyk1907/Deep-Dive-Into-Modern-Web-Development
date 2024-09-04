/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Persons = ({ persons }) => {
	console.log('persons in persons.jsx: ', persons);

	return (
		<>
			<div>
				{persons.map((person) => (
					<div key={person.name}>
						{person.name} {person.number}
					</div>
				))}
			</div>
		</>
	);
};

export default Persons;
