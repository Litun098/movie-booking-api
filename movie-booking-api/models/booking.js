const mongoose = require('mongoose');
const {bookingStatus} = require('../utils/constants');

const bookingSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Theatre"
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Movie"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    timing:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
        default:bookingStatus.inProgress
    },
    noOfSeats:{
        type:String,
        require:true,
    },
    totalCost:{
        type:Number
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.noe();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports = mongoose.model("Booking",bookingSchema);