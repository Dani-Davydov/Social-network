const PostsModel = require('../models/postsModel')

class PostsController {
    async getPosts (req, res) {
        try {
            const result = await PostsModel.find({});

            res.status(200).json({users: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async addPost (req, res) {
        try {
            const { postData, userId } = req.body;

            if (!postData?.title || !postData?.content || !userId) {
                return res.status(400).json({ message: 'Не хватает данных для создания поста' });
            }

            await PostsModel.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        userPosts: {
                            title: postData.title.trim(),
                            content: postData.content.trim()
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

            console.log(req.body)

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

    async editPost (req, res) {
        try {
            const { userId, postId, title, content } = req.body;

            const result = await PostsModel.updateOne(
                {
                    userId,
                    "userPosts._id": postId
                },
                {
                    $set: {
                        "userPosts.$.title": title,
                        "userPosts.$.content": content
                    }
                }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ error: "Пост не найден" });
            }

            res.status(200).json({ message: 'Пост успешно обновлен' });
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при обновлении'})
        }
    }
}

module.exports = new PostsController()