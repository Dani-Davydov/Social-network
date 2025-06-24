const { Router } = require('express')
const postController = require('../controllers/postsController')

const postsRoutes = Router()

postsRoutes.get('/list', postController.getPosts)

postsRoutes.post('/add', postController.addPost)

postsRoutes.post('/findById', postController.getPostById)

postsRoutes.delete('/delete', postController.deletePost)

postsRoutes.delete('/deleteAllUserPosts', postController.deleteAllUserPosts)

postsRoutes.patch('/addComment', postController.addComment)

module.exports = postsRoutes