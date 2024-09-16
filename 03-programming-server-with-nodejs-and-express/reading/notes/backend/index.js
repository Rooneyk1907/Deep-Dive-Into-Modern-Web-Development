require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// let notes = [
// 	{
// 		id: 1,
// 		content: 'HTML is easy',
// 		date: '2022-01-10T17:30:31.098Z',
// 		important: true,
// 	},
// 	{
// 		id: 2,
// 		content: 'Browser can execute only Javascript',
// 		date: '2022-01-10T18:39:34.091Z',
// 		important: false,
// 	},
// 	{
// 		id: 3,
// 		content: 'GET and POST are the most important methods of HTTP protocol',
// 		date: '2022-01-10T19:20:14.298Z',
// 		important: true,
// 	},
// ]

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
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

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
	return maxId + 1
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}
	const note = new Note({
		content: body.content,
		important: body.important || false,
	})

	note.save().then((savedNote) => {
		response.json(savedNote)
	})
})

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes)
	})
})

app.delete('/api/notes/:id', (request, response, next) => {
	Note.findByIdAndDelete(request.params.id)
		.then((note) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content: body.content,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote)
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
