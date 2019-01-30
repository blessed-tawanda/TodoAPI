const {MongoClient,ObjectID} = require('mongodb')

var obj = new ObjectID();

console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    console.log('Unable to connect to Mongo Server')
  } else {
    console.log('Connected to MongoDB server')
  }

  // db.collection('Todos').insertOne({
  //   text: 'Watch a movie',
  //   completed: false
  // }, (err,result) => {
  //   if(err) {
  //     return console.log('Unable to insert data',err)
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2))
  // })

  db.collection('Users').insertOne({
    name: 'Blessed',
    age: 23,
    location: 'Ramoga'
  }, (err,result) => {
    if(err) {
      return console.log('Unable to insert data',err)
    }
    console.log(JSON.stringify(result.ops,undefined,2))
  })

  db.close()
})