const PostsModel = require('../models/postsModel')

class PostsController {
    async getPosts (req, res) {
        try {
            const result = await PostsModel.find({});

            res.status(200).json({posts: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async getPostById (req, res) {
        try {
            const { userId, postId } = req.body;

            if (!userId || !postId) {
                return res.status(400).json({
                    message: 'Необходимо указать userId и postId'
                });
            }

            const userPostsDoc = await PostsModel.findOne(
                { userId },
                { userPosts: { $elemMatch: { _id: postId } } }
            );

            if (!userPostsDoc) {
                return res.status(404).json({
                    message: 'Пост не найден'
                });
            }

            const post = userPostsDoc.userPosts[0];

            res.status(200).json({post: post});
        }   catch (e) {
            console.error(e)
        }
    }

    async addPost (req, res) {
        try {
            const { postData, userId } = req.body;

            console.log(postData, userId)

            if (!postData?.title || !postData?.content || !userId || postData.viewStatus === undefined) {
                return res.status(400).json({ message: 'Не хватает данных для создания поста' });
            }

            await PostsModel.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        userPosts: {
                            title: postData.title.trim(),
                            content: postData.content.trim(),
                            viewStatus: postData.viewStatus,
                        }
                    }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

            res.status(200).json({message: 'Пост успешно добавлен'});
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении'})
        }
    }

    async deletePost (req, res) {
        try {
            const { userId, id } = req.body;


            if (!userId ) {
                return res.status(400).json({ message: 'Необходимо указать userId' });
            }

            const result = await PostsModel.updateOne(
                { userId },
                { $pull: { userPosts: { _id: id } } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Пост не найден или уже удален' });
            }

            res.status(200).json({ message: 'Пост успешно удален' });
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при удалении'})
        }
    }

    async deleteAllUserPosts (req, res) {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({message: 'Пожалуйста проверти id юзера'})
            }

            const {deletedCount} = await PostsModel.deleteOne({ userId: userId });

            if (deletedCount === 0) {
                return  res.status(400).json({message: 'Удаление не произошло, проверьте id usera'})
            }

            res.status(200).json({message: 'посты были успешно удалены'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при удалении'})
        }
    }

    async addComment(req, res) {
        try {
            const { userId, postId, author, comentContent } = req.body;
            console.log('Данные комментария:', { userId, postId, author, comentContent });

            if (!userId || !postId || !author || !comentContent) {
                return res.status(400).json({
                    message: 'Необходимо указать userId, postId, author и content'
                });
            }

            const postExists = await PostsModel.findOne({
                "userPosts._id": postId
            });

            if (!postExists) {
                return res.status(404).json({
                    message: 'Пост не найден'
                });
            }

            const result = await PostsModel.updateOne(
                {
                    "userPosts._id": postId
                },
                {
                    $push: {
                        "userPosts.$.comments": {
                            author: author.trim(),
                            comentContent: comentContent.trim(),
                            createdAt: new Date(),
                        }
                    }
                }
            );

            if (result.modifiedCount === 0) {
                return res.status(500).json({
                    message: 'Не удалось добавить комментарий'
                });
            }

            res.status(200).json({
                message: 'Комментарий успешно добавлен',
                comment: {
                    author,
                    comentContent,
                    createdAt: new Date()
                }
            });
        } catch (e) {
            console.error('Ошибка при добавлении комментария:', e);
            res.status(500).json({
                message: 'Произошла ошибка при добавлении комментария',
                error: e.message
            });
        }
    }
}

module.exports = new PostsController()