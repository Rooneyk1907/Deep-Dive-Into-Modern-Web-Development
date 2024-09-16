const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

const phoneValidator = (number) => {
  if (
    number.length > 8 &&
    (number[2] === '-' || number[3] === '-') &&
    number.split('-').length === 2
  ) {
    return
  } else {
    throw new Error(
      'Phone number improperly formatted. Phone number should be 8 digits and include "-"'
    )
  }
}

console.log('connecting to MongoDB')

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: phoneValidator,
    required: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
