var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var _ = require('lodash')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true 
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.statics.findByToken = function (token) {
  var User = this
  var decoded;

  try {
    decoded = jwt.verify(token,'eureka')
  } catch (err) {
    return Promise.reject(err)
  }
 
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.methods.toJSON = function () {
  return _.pick(this.toObject(), ['_id','email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'eureka').toString()
  user.tokens.push({access,token})

  return user.save().then( () => {
    return token
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}