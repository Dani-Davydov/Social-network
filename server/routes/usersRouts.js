const { Router } = require('express')
const {list, add, findUser, deletePath, addFriend} = require("../Constans/pathes");
const usersController = require('../controllers/usersController')

const usersRoutes = Router()

usersRoutes.get(list, usersController.getUsers)

usersRoutes.post(findUser, usersController.getUserByEmailAndPassword)

usersRoutes.post(add, usersController.addUser)

usersRoutes.delete(deletePath, usersController.deleteUser)

usersRoutes.patch(addFriend, usersController.addToFriends)

module.exports = usersRoutes