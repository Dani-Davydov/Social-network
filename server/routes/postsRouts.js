const { Router } = require('express')
const {list, add, findById, deletePath, deleteAllUserPosts, addComment} = require("../Constans/pathes");
const postController = require('../controllers/postsController')

const postsRoutes = Router()

postsRoutes.get(list, postController.getPosts)

postsRoutes.post(add, postController.addPost)

postsRoutes.post(findById, postController.getPostById)

postsRoutes.delete(deletePath, postController.deletePost)

postsRoutes.delete(deleteAllUserPosts, postController.deleteAllUserPosts)

postsRoutes.patch(addComment, postController.addComment)

module.exports = postsRoutes