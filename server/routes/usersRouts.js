const { Router } = require('express')
const usersController = require('../controllers/usersController')

const usersRoutes = Router()

usersRoutes.get('/list', usersController.getUsers)

usersRoutes.post('/add', usersController.addUser)

usersRoutes.delete('/delete', usersController.deleteUser)

usersRoutes.patch('/edit', usersController.editUserInfo)

module.exports = usersRoutes