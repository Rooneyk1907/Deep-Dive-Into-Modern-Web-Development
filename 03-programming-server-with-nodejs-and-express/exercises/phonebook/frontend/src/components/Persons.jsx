/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ persons, deleteHandler }) => {
	const personArray = persons

	return (
		<>
			{personArray.map((person) => (
				<div key={person.id}>
					<div key={person.id}>
						{person.name} {person.number}
						<DeleteButton
							key={person.id}
							person={person}
							deleteHandler={deleteHandler}
						/>
					</div>
				</div>
			))}
		</>
	)
}

export default Persons
