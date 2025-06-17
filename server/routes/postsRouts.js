const { Router } = require('express')
const postController = require('../controllers/postsController')

const postsRoutes = Router()

postsRoutes.get('/list', postController.getPosts)

postsRoutes.post('/add', postController.addPost)

postsRoutes.delete('/delete', postController.deletePost)

postsRoutes.patch('/edit', postController.editPost)

module.exports = postsRoutes