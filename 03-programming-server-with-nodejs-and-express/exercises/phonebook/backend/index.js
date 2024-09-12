const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			tokens['body'](req, res),
		].join(' ')
	})
)

let persons = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
]

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	response.send(
		`<p>Phonebook has info for ${
			persons.length
		} people</p><br /><p>${Date()}</p>`
	)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find((person) => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id

	persons = persons.filter((person) => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	const maxId =
		persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0

	return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
	const body = request.body
	const newPerson = {
		id: generateId(),
		name: body.name,
		number: body.number,
	}

	// const nameExists = persons
	// 	.map((person) => person.name.toLowerCase())
	// 	.includes(body.name.toLowerCase())
	console.log(body)
	console.log(newPerson)

	if (!body || !body.name || !body.number) {
		return response.status(400).json({
			error: 'please fill out all fields',
		})
	}
	// if (nameExists) {
	// 	return response.status(400).json({
	// 		error: 'name must be unique',
	// 	})
	{
		persons = persons.concat(newPerson)
		return response.status(202).json({
			content: 'new entry created',
		})
	}
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
