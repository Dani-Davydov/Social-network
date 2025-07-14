const UsersModel = require('../models/usersModel')

class UsersController {
    async getUsers (req, res) {
        try {
            const result = await UsersModel.find({});

            res.status(200).json({users: result})
        } catch (e) {
            res.status(400).json({message: 'There was an error receiving'})
        }
    }

    async getUserByEmailAndPassword(req, res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({message: 'Please check your email or password.'})
            }

            console.log(typeof(req.body.password));

            const user = await UsersModel.findOne({
                email: req.body.email,
                password: req.body.password
            });

            if (!user) {
                return res.status(400).json({message: 'There is no user with such email and password.'})
            }

            res.status(200).json({user: [user]});
        } catch (e) {
            console.error('Auth error:', e);
            res.status(400).json({message: 'An error occurred while searching'})
        }
    }

    async addUser(req, res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({message: 'Please add email and password'})
            }

            const existingUser = await UsersModel.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({message: 'A user with this email already exists'})
            }

            const userModel = new UsersModel({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                adminStatus: req.body.adminStatus || false,
            });

            await userModel.save();
            res.status(200).json({message: 'User registered successfully'});
        } catch (e) {
            console.error('Registration error:', e);
            res.status(400).json({message: 'An error occurred while registering'});
        }
    }

    async deleteUser (req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).json({message: 'Please add a title'})
            }

            const {deletedCount} = await UsersModel.deleteOne({ email: req.body.email })

            if (deletedCount === 0) {
                return  res.status(400).json({message: 'Deletion failed, check your email'})
            }

            res.status(200).json({message: 'user was successfully deleted'})
        } catch (e) {
            res.status(400).json({message: 'An error occurred while deleting'})
        }
    }

    async addToFriends (req, res) {
        try {
            if (!req.body.friendEmail || !req.body.friendName || !req.body.friendSurname || !req.body.currentUserEmail || !req.body.currentUserName || !req.body.currentUserSurname) {
                return res.status(400).json({ message: 'Please check your friendns information' });
            }

            console.log(req.body.friendEmail)
            console.log(req.body.friendName)
            console.log(req.body.friendSurname)

            const currentUser = await UsersModel.findOneAndUpdate(
                {email: req.body.currentUserEmail},
                {
                    $push: {
                        friends: {
                            friendEmail: req.body.friendEmail,
                            friendName: req.body.friendName,
                            friendSurname: req.body.friendSurname,
                        }
                    },
                }
            )

            if (!currentUser) {
                res.status(400).json({message: 'current user not found'})
            }

            const friend = await UsersModel.findOneAndUpdate(
                {email: req.body.friendEmail},
                {
                    $push: {
                        friends: {
                            friendEmail: req.body.currentUserEmail,
                            friendName: req.body.currentUserName,
                            friendSurname: req.body.currentUserSurname,
                        }
                    },
                }
            )

            if (!friend) {
                res.status(400).json({message: 'user-friend not found'})
            }

            res.status(200).json({ message: 'friend added successfully' });

        } catch (e) {
            res.status(400).json({message: 'There was an error adding a friend'})
        }
    }
}

module.exports = new UsersController()