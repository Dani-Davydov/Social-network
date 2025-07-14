const friendRequestModel = require("../models/friendRequestModel");

class FriendRequestController {
    async getRequests (req, res) {
        try {
            const result = await friendRequestModel.find({});

            res.status(200).json({request: result})
        } catch (e) {
            res.status(400).json({message: 'There was an error receiving'})
        }
    }

    async create(req, res) {
        try {
            const {fromUserEmail, toUserEmail, extraInfoFrom, extraInfoTo} = req.body;


            if (!fromUserEmail || !toUserEmail || !extraInfoFrom || !extraInfoTo) {
                return res.status(400).json({message: 'Please add email to send your request'})
            }

            console.log(extraInfoFrom)
            console.log(extraInfoTo)

            const isSameRequest = await friendRequestModel.findOne({ fromUserEmail: fromUserEmail, toUserEmail: toUserEmail }).exec();


            if (isSameRequest) {
                return  res.status(400).json({message: 'such an application exists'})
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
                status: "expectation",
            })

            await friendRequestModel1.save()

            res.status(200).json({message: 'application sent successfully'})
        } catch (e) {
            res.status(400).json({message: 'There was an error adding'})
        }
    }

    async getRequestsByFromEmail(req, res) {
        try {
            if (!req.body.fromUserEmail) {
                return res.status(400).json({message: 'Please check your email or password.'})
            }

            const fromRequests = await friendRequestModel.find({ fromUserEmail: req.body.fromUserEmail });

            if (!fromRequests.length) {
                return res.status(200).json({
                    message: 'There are no outgoing requests from this user.',
                    fromRequests: null
                });
            }

            res.status(200).json({fromRequests: fromRequests})
        } catch (e) {
            res.status(400).json({message: 'An error occurred while searching'})
        }
    }

    async getRequestsByToEmail(req, res) {
        try {
            if (!req.body.toUserEmail) {
                return res.status(400).json({message: 'Please email who you are sending to'})
            }

            const toRequests = await friendRequestModel.find({ toUserEmail: req.body.toUserEmail });

            if (!toRequests.length) {
                return res.status(200).json({
                    message: 'There are no outgoing requests for this user.',
                    toRequests: null
                });
            }

            res.status(200).json({toRequests: toRequests})
        } catch (e) {
            res.status(400).json({message: 'An error occurred while searching'})
        }
    }

    async applyRequest(req, res) {
        try {
            if (!req.body.id) {
                return res.status(400).json({message: 'Please check the application id'});
            }

            await friendRequestModel.findByIdAndUpdate(req.body.id, {status: "completed"})

            res.status(200).json({message: 'The item has been updated successfully.'});
        } catch (e) {
            res.status(400).json({message: 'There was an error receiving'})
        }
    }

    async deleteRequest(req, res) {
        try {
            if (!req.body.id) {
                return res.status(400).json({message: 'Please provide your application ID.'});
            }

            const deletedRequest = await friendRequestModel.findByIdAndDelete(req.body.id);

            if (!deletedRequest) {
                return res.status(404).json({message: 'Application not found'});
            }

            res.status(200).json({message: 'The application has been successfully deleted.'});
        } catch (e) {
            console.error('Error deleting request', e);
            res.status(500).json({
                message: 'Error deleting request:',
                error: process.env.NODE_ENV === 'development' ? e.message : undefined
            });
        }
    }
}

module.exports = new FriendRequestController()