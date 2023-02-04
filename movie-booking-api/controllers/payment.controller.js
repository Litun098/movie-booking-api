const Booking = require('../models/booking');
const constants = require('../utils/constants');
const Payment = require('../models/payment');
const User = require('../models/user');

exports.createNewPayment = async (req, res) => {
    const savedBooking = await Booking.find({
        _id: req.body.bookingId
    })
    const bookingTime = savedBooking.createdAt;
    const paymentTime = Date.now();

    const minutes = Math.floor(((paymentTime - bookingTime) / 1000) / 60);

    if (minutes > 2) {
        savedBooking.status = constants.bookingStatus.expired;

        await savedBooking.save();
        return res.status(400).send({
            message: "Cant do payment as booking is delayed and expired"
        })
    }


    const rozerpayAPIResponse = {
        paymentStatus: constants.paymentStatus.success
    }

    var paymentObj = {
        bookingId: req.body.bookingId,
        amount: savedBooking.totalCost,
        status: rozerpayAPIResponse.paymentStatus
    }

    try {
        const payment = await Payment.create(paymentObj);

        savedBooking.status = (paymentObj.status == constants.paymentStatus.success) ? constants.bookingStatus.completed : constants.bookingStatus.failed

        await savedBooking.save();

        return res.status(201).send(payment);
    } catch (err) {
        return res.status(500).status("Internal server error!");
    }
}

exports.getAllPayments = async (req, res) => {
    const savedUser = await User.findOne({ userId: req.user.userId });

    const queryObj = {};

    if (savedUser.userTypes === constants.userType.admin) {

    } else {
        const bookings = await Booking.find({ userId: savedUser._id });
        const bookingsId = bookings.map(booking => booking._id);
        queryObj.bookingId = { $in: bookingsId };
    }
    const payments = await Payment.find(queryObj);
    return res.status(200).send(payments)
}

exports.getPaymentById = async (req, res) => {
    const paymentId = req.params.id;
    const savedUser = await User.findOne({ userId: req.userId });
    const savedPayment = await Payment.findOne({
        _id: paymentId
    });

    if (!savedPayment) {
        return res.status.send({
            message: "Invalid payment Id"
        });

    }
    if (savedUser.userTypes === constants.userType.admin) {
        const bookingId = savedPayment.bookingId;
        const savedBooking = await Booking.findOne({ _id: bookingId });
        const userId = savedBooking.userId;

        if (!userId.equals(savedUser._id)) {
            return res.status(403).send({
                message: "Forbiden, payment id not associated with the loggedin user"
            })
        }
    }
    return res.status(200).send(savedPayment);
}