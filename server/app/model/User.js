const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema, model} = mongoose

const userSchema = new Schema({
  account: {type: String, require: true},
  password: {
    type: String,
    require: true,
    set(val) {
      return bcrypt.hashSync(val, 10)
    }
  },
  username: {type: String, require: true},
  isAdmin: {type: Boolean, default: false},
  todoList: {type: [Object], default: []},
  score: {type: Number, default: 0}
})

const User = model('User', userSchema)

module.exports = User