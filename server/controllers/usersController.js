const UsersModel = require('../models/usersModel')

class UsersController {
    async getUsers (req, res) {
        try {
            const result = await UsersModel.find({});

            res.status(200).json({users: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async getUserByEmailAndPassword (req, res) {
        try {
            if (!req.body.email && !req.body.password) {
                return res.status(400).json({message: 'Пожалуйста проверьте почту или пароль'})
            }

            const user = await UsersModel.find({ email: req.body.email, password: req.body.password });

            console.log(user)

            if (!user.length) {
                return res.status(400).json({message: 'Пользователя с такой почтой и паролем не существует'})
            }

            res.status(200).json({user: user})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при поиске'})
        }
    }

    async addUser (req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).json({message: 'Пожалуйста добавьте почту'})
            }

            const isUserWithEmailFromReq = await UsersModel.findOne({ email: req.body.email }).exec();

            if (isUserWithEmailFromReq) {
                return  res.status(400).json({message: 'Пользователь c таким email уже существует'})
            }

            console.log(isUserWithEmailFromReq)

            const userModel = new UsersModel({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                adminStatus: req.body.adminStatus ? req.body.adminStatus : false,
            })

            await userModel.save()

            res.status(200).json({message: 'user успешно добавлен'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении'})
        }
    }

    async deleteUser (req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).json({message: 'Пожалуйста добавьте заголовок'})
            }

            const {deletedCount} = await UsersModel.deleteOne({ email: req.body.email })

            if (deletedCount === 0) {
                return  res.status(400).json({message: 'Удаление не произошло, проверьте почту'})
            }

            res.status(200).json({message: 'user был успешно удален'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при удалении'})
        }
    }

    async addToFriends (req, res) {
        try {
            if (!req.body.friendEmail || !req.body.friendName || !req.body.friendSurname || !req.body.currentUserEmail || !req.body.currentUserName || !req.body.currentUserSurname) {
                return res.status(400).json({ message: 'Пожалуйста, проверьте информацию друга' });
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
                res.status(400).json({message: 'текущий пользователь не найден'})
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
                res.status(400).json({message: 'пользователь-друг не найден'})
            }

            res.status(200).json({ message: 'друг успешно добавлен' });

        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении друга'})
        }
    }
}

module.exports = new UsersController()