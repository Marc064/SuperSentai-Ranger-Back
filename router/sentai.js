const routes = require('express').Router()

const {
    findAll,
    findById,
    updateEpisode
} = require('../controller/sentaiController')


routes.get('/', findAll)
routes.get('/:id', findById)
routes.put('/:id', updateEpisode)


module.exports = routes