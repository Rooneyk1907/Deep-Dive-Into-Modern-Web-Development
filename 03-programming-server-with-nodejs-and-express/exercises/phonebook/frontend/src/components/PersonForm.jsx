/* eslint-disable react/prop-types */

const PersonForm = ({
	addPersons,
	setNewName,
	newName,
	setNewNumber,
	newNumber,
}) => {

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
