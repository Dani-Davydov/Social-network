const PostsModel = require('../models/postsModel')

class PostsController {
    async getPosts (req, res) {
        try {
            const result = await PostsModel.find({});

            res.status(200).json({posts: result})
        } catch (e) {
            res.status(400).json({message: 'There was an error receiving'})
        }
    }

    async getPostById (req, res) {
        try {
            const { userId, postId } = req.body;

            if (!userId || !postId) {
                return res.status(400).json({
                    message: 'UserId and postId must be specified.'
                });
            }

            const userPostsDoc = await PostsModel.findOne(
                { userId },
                { userPosts: { $elemMatch: { _id: postId } } }
            );

            if (!userPostsDoc) {
                return res.status(404).json({
                    message: 'Post not found'
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

            if (!postData?.title || !postData?.content || !userId || postData.viewStatus === undefined || !postData.postAuthor) {
                return res.status(400).json({ message: 'Not enough data to create a post' });
            }

            await PostsModel.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        userPosts: {
                            title: postData.title.trim(),
                            content: postData.content.trim(),
                            viewStatus: postData.viewStatus,
                            postAuthor: postData.postAuthor.trim(),
                        }
                    }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

            res.status(200).json({message: 'Post added successfully'});
        } catch (e) {
            res.status(400).json({message: 'There was an error adding'})
        }
    }

    async deletePost (req, res) {
        try {
            const { userId, id } = req.body;


            if (!userId ) {
                return res.status(400).json({ message: 'UserId must be specified' });
            }

            const result = await PostsModel.updateOne(
                { userId },
                { $pull: { userPosts: { _id: id } } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Post not found or already deleted' });
            }

            res.status(200).json({ message: 'Post successfully deleted' });
        } catch (e) {
            res.status(400).json({message: 'An error occurred while deleting'})
        }
    }

    async deleteAllUserPosts (req, res) {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({message: 'Please check the user id'})
            }

            const {deletedCount} = await PostsModel.deleteOne({ userId: userId });

            if (deletedCount === 0) {
                return  res.status(400).json({message: 'Deletion failed, check user id'})
            }

            res.status(200).json({message: 'The posts were successfully deleted'})
        } catch (e) {
            res.status(400).json({message: 'An error occurred while deleting'})
        }
    }

    async addComment(req, res) {
        try {
            const { userId, postId, author, comentContent } = req.body;

            if (!userId || !postId || !author || !comentContent) {
                return res.status(400).json({
                    message: 'You must specify userId, postId, author and content'
                });
            }

            const postExists = await PostsModel.findOne({
                "userPosts._id": postId
            });

            if (!postExists) {
                return res.status(404).json({
                    message: 'Post not found'
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
                    message: 'Failed to add comment'
                });
            }

            res.status(200).json({
                message: 'Comment successfully added',
                comment: {
                    author,
                    comentContent,
                    createdAt: new Date()
                }
            });
        } catch (e) {
            console.error('Error adding comment', e);
            res.status(500).json({
                message: 'Error adding comment',
                error: e.message
            });
        }
    }
}

module.exports = new PostsController()