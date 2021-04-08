const locationController = require('../controllers/locationController')

const express = require('express')
const locationRoutes = express.Router()

locationRoutes.post('/search/:location',locationController.search)

locationRoutes.post('/:userId/save/:locationId', locationController.save)

locationRoutes.get('/search/:locationId',locationController.searchOne)
module.exports = locationRoutes