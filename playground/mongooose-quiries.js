const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '5c51a7311f630a0843fac74811'

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('find: ',todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('findOne: ',todo)
// })

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Document not found')
//   }
//   console.log('Find By Id:', todo)
// })

User.findById(id).then((todo) => {
  if(todo) {
    console.log('User Found', todo)
  } else {
    console.log('User Not Found')
  }
}).catch((err) => {
  if(err) {
    console.log(err.message)
  }
})