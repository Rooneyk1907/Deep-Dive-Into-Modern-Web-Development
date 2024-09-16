/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ persons, deleteHandler }) => {
	return persons.map((person) => (
		<div key={person.id}>
			{person.name} {person.number}
			<DeleteButton person={person} deleteHandler={deleteHandler} />
		</div>
	))
}
export default Persons
