const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// var data = {
//   id: 1234
// }

var password = 'blessed'

bcrypt.genSalt(10, (err,salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

var hashedPassword = '$2a$10$JUKe5kL8zPtdv4s8u6C2Ru/Y1dZXINSU83OlDyJeBJuljoNMuXsRm'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// var token = jwt.sign(data,'eureka')
// console.log(token)

// var decoded = jwt.verify(token, 'eureka')
// console.log(decoded)

// var message = 'I am number 3'
// var hash = SHA256(message).toString()

// console.log(`Message: ${message}`)
// console.log(`Hash: ${hash}`)

// var data = {
//   id: 5
// }

// var token = {
//   data,
//   hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data = {
//   id: 6
// }

// token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if (token.hash == resultHash) {
//   console.log('Message was not changed')
// } else {
//   console.log('Message was changed suspicious data')
// }
