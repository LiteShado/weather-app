const userController = require('../controllers/userController')

const express = require('express')
const userRoutes = express.Router()

userRoutes.post('/', userController.create)
userRoutes.delete('/:id', userController.delete)
userRoutes.post('/login',userController.login)
userRoutes.get('/:userId/getlocations',userController.getLocations)
userRoutes.delete('/:userId/delete/:locationId', userController.deleteLocation)

module.exports = userRoutes