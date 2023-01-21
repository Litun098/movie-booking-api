const Movie = require('../models/movie');

exports.createMovie = async (req,res)=>{
    try{
        const movie = await Movie.create(req.body);
        return res.status(201).send(movie);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Something went wrong."
        })
    }
}

exports.getAllMovies = async (req,res)=>{
    try{
        const movie = await Movie.find();
        return res.status(201).send(movie);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Something went wrong."
        })
    }
}

exports.getMovie = async  (req,res)=>{
    try{
        const movie = await Movie.findOne({
            _id:req.params.id
        })
        res.status(201).send(movie)
    }catch(err){
        console.log(err)
    }
}