const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://rooneyjkevin:${password}@phonebook.by8e8.mongodb.net/?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
	name: newName,
	number: newNumber,
})

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
} else if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log('phonebook:')
		result.forEach((person) => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
} else {
	// else {
	// 	console.log('please provide a name and number to add to the phonebook')
	// 	process.exit(1)
	// }

	person.save().then((result) => {
		console.log(`added ${newName} number ${newNumber} to phonebook`)
		mongoose.connection.close()
	})
}
