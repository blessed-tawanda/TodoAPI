const {MongoClient,ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    console.log('Unable to connect to Mongo Server')
  } else {
    console.log('Connected to MongoDB server')
  }

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c518dcaee28fd4367410883')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c518f38ee28fd43674108ed')
  }, {
    $set: {
      name: 'Woody'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false 
  }).then((result) =>{
    console.log(result)
  })

  // db.close()
})