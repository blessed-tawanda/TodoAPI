const {mongoose} = require('./db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text 
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) =>{
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req,res) => {
  var id = req.params.id
  if(ObjectID.isValid(id)) {
    Todo.findById(id).then((todo) => {
      if(todo) {
        res.send({todo})
      } else {
        res.status(404).send('')
      }
    }).catch((err) => {
      res.status(400).send('')
    })
  } else {
    res.status(404).send('')
  }
})

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id
  
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('')
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }

    var result = {todo}
    result.Removed = true
    res.send({result})

  }).catch((err) => {
    res.status(400).send('')
  })

})

app.listen(3000, () => {
  console.log('App Started at port 3000')
})