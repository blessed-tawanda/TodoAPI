const {mongoose} = require('./db/mongoose')
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

app.listen(3000, () => {
  console.log('App Started at port 3000')
})