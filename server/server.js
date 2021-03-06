require('./config/config')
const {mongoose} = require('./db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./../middleware/authenticate')


const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')

var port = process.env.PORT

var app = express()
app.use(bodyParser.json())

app.post('/todos', authenticate, (req,res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id 
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos',authenticate, (req,res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
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

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id
  var body = _.pick(req.body,['text','completed'])

  if(!ObjectID.isValid(id)) {
    return res.status(404).send('')
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send()
  })
})

app.post('/users', (req,res) => {
  var body = _.pick(req.body,['email','password'])
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then( (token) => {
    res.header('x-auth',token).send(user)
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.post('/users/login', (req,res) => {
  var body = _.pick(req.body,['email','password'])

  User.findByCredentials(body.email, body.password).then((user) => {
   return user.generateAuthToken().then((token) => {
    res.header('x-auth',token).send(user)
   })
  }).catch( (err) => {
    res.status(400).send()
  })
})

app.get('/users/me', authenticate ,(req,res) => {
  res.send(req.user)
})

app.delete('/users/me/token', authenticate, (req,res) => {
  // console.log(req.user)
  // console.log(req.token)
  req.user.removeToken(req.token).then(() => {
    res.status(200).sendStatus(200)
  }, () => {
    res.status(400).sendStatus(400)
  })
})

app.listen(port, () => {
  console.log(`App Started at port ${port}`)
})