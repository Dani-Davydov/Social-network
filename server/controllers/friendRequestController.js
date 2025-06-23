const friendRequestModel = require("../models/friendRequestModel");

class FriendRequestController {
    async getRequests (req, res) {
        try {
            const result = await friendRequestModel.find({});

            res.status(200).json({request: result})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async create(req, res) {
        try {
            const {fromUserEmail, toUserEmail, extraInfoFrom, extraInfoTo} = req.body;


            if (!fromUserEmail || !toUserEmail || !extraInfoFrom || !extraInfoTo) {
                return res.status(400).json({message: 'Пожалуйста добавьте почты для отправки заявки'})
            }

            console.log(extraInfoFrom)
            console.log(extraInfoTo)

            const isSameRequest = await friendRequestModel.findOne({ fromUserEmail: fromUserEmail, toUserEmail: toUserEmail }).exec();


            if (isSameRequest) {
                return  res.status(400).json({message: 'такая заявка существует'})
            }

            const friendRequestModel1 = new friendRequestModel({
                fromUserEmail: fromUserEmail,
                toUserEmail: toUserEmail,
                extraInfoFrom: {
                    fromName: extraInfoFrom.fromName,
                    fromSurname: extraInfoFrom.fromSurname,
                },
                extraInfoTo: {
                    toName: extraInfoTo.toName,
                    toSurname: extraInfoTo.toSurname,
                },
                status: false,
            })

            await friendRequestModel1.save()

            res.status(200).json({message: 'заявка успешно отправлена'})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при добавлении'})
        }
    }

    async getRequestsByFromEmail(req, res) {
        try {
            if (!req.body.fromUserEmail) {
                return res.status(400).json({message: 'Пожалуйста проверьте почту или пароль'})
            }

            const fromRequests = await friendRequestModel.find({ fromUserEmail: req.body.fromUserEmail });

            if (!fromRequests.length) {
                return res.status(200).json({
                    message: 'Нет исходящих заявок от этого пользователя',
                    fromRequests: null
                });
            }

            res.status(200).json({fromRequests: fromRequests})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при поиске'})
        }
    }

    async getRequestsByToEmail(req, res) {
        try {
            if (!req.body.toUserEmail) {
                return res.status(400).json({message: 'Пожалуйста имаил кому отпровляешь'})
            }

            const toRequests = await friendRequestModel.find({ toUserEmail: req.body.toUserEmail });

            if (!toRequests.length) {
                return res.status(200).json({
                    message: 'Нет исходящих заявок для этого пользователя',
                    toRequests: null
                });
            }

            res.status(200).json({toRequests: toRequests})
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при поиске'})
        }
    }

    async applyRequest(req, res) {
        try {
            if (!req.body.id) {
                return res.status(400).json({message: 'Пожалуйста, проверьте id заявки'});
            }

            await friendRequestModel.findByIdAndUpdate(req.body.id, {status: true})

            res.status(200).json({message: 'Элемент успешно обновлен'});
        } catch (e) {
            res.status(400).json({message: 'Произошла ошибка при получении'})
        }
    }

    async deleteRequest(req, res) {
        try {
            if (!req.body.id) {
                return res.status(400).json({message: 'Пожалуйста, укажите ID заявки'});
            }

            const deletedRequest = await friendRequestModel.findByIdAndDelete(req.body.id);

            if (!deletedRequest) {
                return res.status(404).json({message: 'Заявка не найдена'});
            }

            res.status(200).json({message: 'Заявка успешно удалена'});
        } catch (e) {
            console.error('Ошибка при удалении заявки:', e);
            res.status(500).json({
                message: 'Произошла ошибка при удалении заявки',
                error: process.env.NODE_ENV === 'development' ? e.message : undefined
            });
        }
    }
}

module.exports = new FriendRequestController()