const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');
const notificationClient = require("../utils/NotificationClient");
const { userRegistration } = require("../scripts/emailScripts");

exports.signup = async (req, res) => {
    var userStatus;

    if (!req.body.userType || req.body.userType == constants.userType.customer) {
        userStatus = constants.userStatus.approved;
    } else {
        userStatus = constants.userStatus.pending;
    }

    const userObject = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        userStatus: userStatus,
        userType: req.body.userType
    }

    try {
        const user = await User.create(userObject);
        const { subject, html, text } = userRegistration(user);
        notificationClient.sendEmail([user.email], subject, html, text);
        res.status(201).send({
            message: "Signed up successfully.",
            user: user
        });
    } catch (err) {
        res.status(500).send({
            message: "Internal server error."
        })
    }
}

exports.signin = async (req, res) => {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(400).send({
            message: "User id does not exists"
        })
    }

    if (user.userStatus !== constants.userStatus.approved) {
        return res.status(403).send({
            message: "Not authorized!"
        })
    }

    let isCorrectPassord = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassord) {
        return res.status(401).send({
            message: "Username or password incorrect."
        })
    }

    const token = jwt.sign({ id: user.userId }, config.secret, { expiresIn: 120000 });

    return res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userTypes,
        userStatus: user.userStatus,
        accessToken: token,
    })
}