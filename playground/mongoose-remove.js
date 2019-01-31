const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//   console.log(result)
// })

// Todo.findOneAndRemove({

// })

var id = '5c52f09fee28fd43674116cb'

Todo.findByIdAndRemove(id).then((todo) => {
  console.log(todo)
})