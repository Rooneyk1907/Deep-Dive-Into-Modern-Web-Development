/* eslint-disable react/prop-types */

const DeleteButton = ({ person, deleteHandler }) => {
	return person ? (
		<button onClick={() => deleteHandler(person.name, person.id)}>
			Delete
		</button>
	) : null
}

export default DeleteButton
