// require('dotenv').config()

const express = require('express')
const app = express()

// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)
const userRoutes = require('./routes/userRoutes')
const locationRoutes = require('./routes/locationRoutes')

app.use(express.json())
app.use(require('cors')())


const lookupUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const user = await models.user.findOne({
        where: {
          id: decryptedId.userId
        }
      })
      req.user = user
    } else {
      req.user = null
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}
app.use(lookupUser)



const models = require('./models')

const createUser = async (req, res) => {
  try {
    const user = await models.user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    res.json({ message: 'signup successful', user })
  } catch (error) {
    res.status(400)
    res.json({ error: 'email already taken' })
  }
}
app.post('/users', createUser)

const login = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user.password === req.body.password) {
      res.json({ message: 'login success', user})
    } else {
      res.status(401).json({ error: 'login failed' })
    }
  } catch (error) {
    res.status(400).json({ error: 'login failed' })
  }
}
app.post('/users/login', login)



const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
  routesReport.print()
})

app.use('/user',userRoutes)

app.use('/location',locationRoutes)
