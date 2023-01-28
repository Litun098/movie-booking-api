const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.update = async (req, res) => {
    const userId = req.userId;

    if (!req.body.password) {
        return res.status(400).send({ message: "Please enter password" });
    }

    try {
        const user = await User.findByIdAndUpdate({
            userId: userId
        }, {
            password: bcrypt.hashSync(req.body.password, 10)
        });

        res.status(200).send({
            message: "Password updated successfully."
        })
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong." })
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOneAndUpdate({
            userId: userId
        }, {
            userStatus: req.body.userStatus
        })

        if (!user) {
            return res.status(400).send({
                message: "Invalid user Id"
            })
        }

        return res.status(200).send({
            message: "User record has been updated successfully"
        })
    } catch (err) {
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}