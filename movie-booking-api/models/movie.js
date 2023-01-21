const mongoose = require('mongoose');
const constants = require('../utils/constants')

const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    casts:{
        type:[String],
        required:true,
    },
    trailerUrl:{
        type:String,
        required:true,
    },
    posterUrl:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    releaseDate:{
        type:String,
        required:true,
    },
    director:{
        type:String,
        required:true,
    },
    releaseStatus:{
        type:String,
        required:true,
        default:constants.releaseStatus.released,
    }
})

module.exports = mongoose.model("Movie",movieSchema);