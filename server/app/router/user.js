const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const {secret} = require('../config/key')
const router  = express.Router()

const findUser = async req => {
  const token = req.headers.authorization.split(' ')[1]
  const {_id} = jwt.verify(token, secret)
  const user = await User.findById(_id)
  return user
}

const isvalid = async (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1]
  try {
    jwt.verify(token, secret)
  } catch(err) {
    if(err instanceof jwt.JsonWebTokenError) {
      return res.status(600).send('令牌失效，请重新登录')
    }
  }
  next()
}

router.get('/', isvalid, async (req, res) => {
  const user = await findUser(req)
  const {account, isAdmin} = user
  res.send({account, isAdmin})
})

router.get('/info', isvalid, async (req, res) => {
  const user = await findUser(req)
  const {account, username} = user
  res.send({account, username})
})

router.post('/info/username', isvalid, async (req, res) => {
  const user = await findUser(req)
  await User.updateOne({_id: user._id}, {username: req.body.username})
  res.send('OK')
})

router.post('/info/password', isvalid, async (req, res) => {
  const user = await findUser(req)
  const isPassword = await bcrypt.compareSync(req.body.password, user.password)
  if(isPassword) return res.status(409).send('新旧密码相同')
  await User.updateOne({_id: user._id}, {password: req.body.password})
  res.send('OK')
})

router.get('/database', isvalid, async (req, res) => {
  const user = await findUser(req)
  if(!user.isAdmin) return res.status(600).send('令牌失效，请重新登录')
  const list = await User.find()
  const newList = list.slice(1).map(obj => {
    return {account: obj.account, username: obj.username}
  })
  res.send(newList)
})

router.post('/database', isvalid, async (req, res) => {
  const user = await findUser(req)
  if(!user.isAdmin) return res.status(600).send('令牌失效，请重新登录')
  await User.deleteOne({account: req.body.account})
  res.send('OK')
})

router.get('/snake', isvalid, async (req, res) => {
  const user = await findUser(req)
  const list = await User.find()
  const newList = list.slice(1).map(obj => {
    return {username: obj.username + (obj.username === user.username? '（自己）': ''), score: obj.score}
  }).sort((a ,b) => b.score - a.score)
  res.send(newList)
})

router.post('/snake', isvalid, async (req, res) => {
  const user = await findUser(req)
  if(req.body.score > user.score) {
    await User.updateOne({_id: user._id}, {score: req.body.score})
  }
  res.send('OK')
})

router.get('/todolist', isvalid, async (req, res) => {
  const user = await findUser(req)
  res.send(user.todoList)
})

router.post('/todolist', isvalid, async (req, res) => {
  const user = await findUser(req)
  await User.updateOne({_id: user._id}, {todoList: req.body})
  res.send('OK')
})

router.get('/register', async (req, res) => {
  res.send('OK')
})

router.post('/register', async (req, res) => {
  const user = await User.findOne({account: req.body.account})
  if(user) return res.status(409).send('用户已存在')
  await new User(req.body).save()
  res.send('OK')
})

router.get('/login', async (req, res) => {
  res.send('OK')
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({account: req.body.account})
  if(!user) return res.status(422).send('用户不存在')
  const isPassword = await bcrypt.compareSync(req.body.password, user.password)
  if(!isPassword) return res.status(422).send('密码错误')
  const {_id, account} = user
  const token = jwt.sign({_id, account}, secret, {expiresIn: '24h'})
  res.send(token)

})


module.exports = router