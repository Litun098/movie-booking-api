const Booking = require('../models/booking')
const User = require('../models/user')
const constants = require('../utils/constants')

exports.createBooking = async (req, res) => {
    const user = await User.findOne({
        userId: req.userId
    })

    const bookingOb = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: user._id,
        timing: req.body.timing,
        noOfSeat: req.body.noOfSeats,
        totalCost: req.body.noOfSeat * 250
    }

    try {
        const booking = await Booking.findOne({
            _id: req.params.id
        })
        req.status(200).send(booking);
    } catch (err) {
        res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const bookings = await Booking.findOne({
            _id: req.params.id
        });
        return res.status(200).send(bookings);
    } catch (err) {
        return res.status(500).send({
            message: "Something went wrong"
        })
    }
}

const getAllBookings = async (req, res) => {
    try {
        const booking = await Booking.find();
        return res.status(200).send(booking);
    } catch (err) {
        return res.status(200).send({ message: "Something went wrong." });
    }
}

exports.updateBooking = async (req, res) => {
    const savedBooking = await Booking.findOne({
        _id: req.params.id
    });
    if (!savedBooking) {
        return res.status(400).send({
            message: "Something went wrong."
        })
    }

    savedBooking.theatreId = req.body.theatreId ? req.body.theatreId : savedBooking.theatreId;
    savedBooking.movieId = req.body.movieId ? req.body.movieId : savedBooking.movieId;
    savedBooking.userId = req.body.userId ? req.body.userId : savedBooking.userId;
    savedBooking.timing = req.body.timing ? req.body.timing : savedBooking.timing;
    savedBooking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : savedBooking.noOfSeats;
    savedBooking.totalCost = savedBooking.noOfSeats * constants.ticketPrice;
    savedBooking.status = req.body.status ? req.body.status : savedBooking.status;

    try{
        const updatedBooking = await savedBooking.save();
        return res.status(201).send(updateBooking);
    }catch(err){
        return res,status(400).send({
            message:"Something went wrong"
        })
    }
}

exports.cancelBooking = async (req,res)=>{
    const savedBooking = await Booking.findOne({
        _id:req.params.id
    });

    const savedUser = await User.findOne({
        _id:req.params.id
    })

    if(!savedBooking){
        return res.status(400).send({
            message:"No Booking found."
        })
    }
    if(!savedBooking.userId.equals(savedUser._id)){
        return res.status(403).send({
            message:"User has insufficient permission to cancel this booking"
        })
    }

    savedBooking.status = constants.bookingStatus.cancelled;

    try{
        const updatedBooking = await savedBooking.save();
        return res.status(201).send({
            message:"Successfully cancelled.",
        })
    }catch(err){
        return res.status(500).send({
            message:"Something went wrong."
        })
    }
}

