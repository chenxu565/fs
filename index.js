const express = require('express')
const app = express()
const morgan = require('morgan') // import morgan
require('dotenv').config()

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('build'))
app.use(express.json())
// app.use(morgan('tiny')) // use tiny format

// cors
const cors = require('cors')
app.use(cors())
// Create a new token ':body'
morgan.token('body', function (request, response) { 
  return Object.keys(request.body).length ? JSON.stringify(request.body) : null 
})

// Use morgan middleware with custom format
app.use(morgan(function (tokens, request, response) {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.body(request, response) ? `- ${tokens.body(request, response)}` : ''
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(persons => {
        // console.log(persons)
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
    }
)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log(body)
  if (!body.name || !body.number) { 
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) // pass the error to the error handler middleware
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end() // 204 No Content
    })
    .catch(error => next(error))
  }
)

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  // console.log(body)
  const person = {
    name: body.name,
    number: body.number,
  }
  // console.log(person)
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  }
)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})