const {MongoClient,ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err) {
    console.log('Unable to connect to Mongo Server')
  } else {
    console.log('Connected to MongoDB server')
  }

  //deleteMany

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result)
  // })

  //deleteOne

  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result)
  // })


  //findOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result)
  // })

  // db.collection('Users').deleteMany({name: 'Blessed'}).then((result) => {
  //   if(result.result.ok === 1) {
  //     console.log('Delete Successful')
  //   }
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5c515b3e58c064277cb20f04')}).then((result) => {
      console.log(result)
    })

  // db.close()
})