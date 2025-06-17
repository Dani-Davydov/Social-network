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

    async addUser (req, res) {
        try {
            if (!req.body.email) {
                return res.status(400).json({message: 'Пожалуйста добавьте почту'})
            }

            const userModel = new UsersModel({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
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

    async editUserInfo (req, res) {
        try {
            if (!req.body.name || !req.body.surname) {
                return res.status(400).json({ message: 'Пожалуйста, проверьте новую информацию' });
            }

            console.log(req.body.id)

            await UsersModel.findByIdAndUpdate(req.body.id, {
                name: req.body.name,
                surname: req.body.surname,
            })

            res.status(200).json({ message: 'user успешно обновлен' });
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при обновлении'})
        }
    }
}

module.exports = new UsersController()