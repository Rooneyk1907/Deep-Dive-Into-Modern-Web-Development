const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
var morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT

const Person = require('./models/person')

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

//* MIDDLEWARE *//
app.use(cors())
app.use(express.json())
app.use(requestLogger)
// .use(express.static('dist'))

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

// let persons = [
// 	{
// 		id: '1',
// 		name: 'Arto Hellas',
// 		number: '040-123456',
// 	},
// 	{
// 		id: '2',
// 		name: 'Ada Lovelace',
// 		number: '39-44-5323523',
// 	},
// 	{
// 		id: '3',
// 		name: 'Dan Abramov',
// 		number: '12-43-234345',
// 	},
// 	{
// 		id: '4',
// 		name: 'Mary Poppendieck',
// 		number: '39-23-6423122',
// 	},
// ]

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((people) => {
			response.json(people)
		})
		.catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
	response.send(
		`<p>Phonebook has info for ${
			Person.length
		} people</p><br /><p>${Date()}</p>`
	)
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((result) => response.json(result).end())
		.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson)
		})
		.catch((error) => next(error))
})

// const generateId = () => {
// 	const maxId =
// 		persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0

// 	return String(maxId + 1)
// }

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'please fill out all fields',
		})
	}
	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((newEntry) => {
			response.json(newEntry)
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	next(error)
}

app.use(errorHandler)
