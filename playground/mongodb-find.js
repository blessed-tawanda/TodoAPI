const {MongoClient,ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    console.log('Unable to connect to Mongo Server')
  } else {
    console.log('Connected to MongoDB server')
  }

  db.collection('Users').find({name: 'Blessed'}).toArray().then((docs) => {
    console.log('Users with names Blessed')
    console.log(JSON.stringify(docs,undefined,2))
  }, (err) => {
    console.log('Unable to fetch todos', err)
  })

  db.close()
})