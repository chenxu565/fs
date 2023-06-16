const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
//   `mongodb+srv://fullstack:${password}@cluster0.mnfuhu9.mongodb.net/noteApp?retryWrites=true&w=majority`
  `mongodb+srv://fullstack:${password}@cluster0.mnfuhu9.mongodb.net/phonebook?retryWrites=true&w=majority`
// mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    // If there are only 3 arguments, then we only want to print the phonebook
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    // If there are 5 arguments, then we want to add a person to the phonebook
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(result)
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Invalid number of arguments')
    process.exit(1)
}