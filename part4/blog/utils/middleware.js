const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Time:  ', new Date().toISOString())
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.message.includes('NotFound')) {
    return response.status(404).json({ error: error.message })
  } else if (error instanceof jwt.JsonWebTokenError) {
    // console.log('error instanceof jwt.JsonWebTokenError')
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  // console.log('authorization', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    // console.log('!token')
    return response.status(401).json({ error: 'token missing' })
  }
  // console.log('token', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // console.log('decodedToken', decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.user = await User.findById(decodedToken.id).orFail(new Error('UserNotFound'))
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}