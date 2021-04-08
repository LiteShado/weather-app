const models = require('../models')
const axios = require('axios')
const locationController = {}

locationController.search = async (req,res) => {
    try {
        let search = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&appid=${"a82c8eadf3374622a6718657ab66edb7"}&units=imperial`)
    //    console.log(search)
       console.log(search.data)
       res.send(search.data)
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
locationController.searchOne = async (req,res) => {
    try {
        let search = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${req.params.locationId}&appid=${"a82c8eadf3374622a6718657ab66edb7"}&units=imperial`)
        res.send(search.data)
    } catch (error) {
        res.json({error})
    }
}
locationController.save = async (req,res) => {
    try {
        const [locationToSave, created] = await models.location.findOrCreate({
            where:{
                locationId: req.params.locationId
            },
            defaults:{
                locationId: req.params.locationId
            }
        })
        // const locationToSave = await models.location.create({

        //         locationId: req.params.locationId
        // })
        let user = await models.user.findOne({
            where: {
                id: req.params.userId
            }
        })
        await user.addLocation(locationToSave)
        let results = await user.getLocation()
        res.json({locationToSave, user, results})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}



module.exports = locationController
