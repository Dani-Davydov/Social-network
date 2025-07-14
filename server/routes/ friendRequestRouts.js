const { Router } = require('express')
const {list, add, getFromReq, getToReq, chengeRequestStatus, deletePath} = require("../Constans/pathes");
const friendRequestController = require('../controllers/friendRequestController')

const friendRequestRoutes = Router()

friendRequestRoutes.post(getFromReq, friendRequestController.getRequestsByFromEmail)

friendRequestRoutes.post(getToReq, friendRequestController.getRequestsByToEmail)

friendRequestRoutes.patch(chengeRequestStatus, friendRequestController.applyRequest)

friendRequestRoutes.post(add, friendRequestController.create)

friendRequestRoutes.get(list, friendRequestController.getRequests)

friendRequestRoutes.delete(deletePath, friendRequestController.deleteRequest)


module.exports = friendRequestRoutes