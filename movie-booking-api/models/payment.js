const mongoose = require('mongoose');
const {paymentStatus} = require('../utils/constants');

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Booking"
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        require:true,
        default:paymentStatus.pending,
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports = mongoose.model('Payment',paymentSchema);