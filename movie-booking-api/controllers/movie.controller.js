const Movie = require('../models/movie');
const theatre = require('../models/theatre');
const Theatre = require('../models/theatre');

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).send(movie);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.getAllMovies = async (req, res) => {
    
    const query = {};
    if(req.query.name != undefined){
        query.name = req.query.name;
    }
    try {
        const movie = await Movie.find(query);
        return res.status(201).send(movie);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id
        })
        res.status(201).send(movie)
    } catch (err) {
        console.log(err)
    }
}

exports.updateMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const savedMovie = await Movie.findOne({ _id: id });

        if (!savedMovie) {
            return res.status(404).send({
                message: "Movie does not exist."
            })
        }

        savedMovie.name = req.body.name ? req.body.name : savedMovie.name
        savedMovie.description = req.body.description ? req.body.description : savedMovie.description
        savedMovie.casts = req.body.casts ? req.body.casts : savedMovie.casts
        savedMovie.director = req.body.director ? req.body.director : savedMovie.director
        savedMovie.trailerUrl = req.body.trailerUrl ? req.body.trailerUrl : savedMovie.trailerUrl
        savedMovie.posterUrl = req.body.posterUrl ? req.body.posterUrl : savedMovie.posterUrl
        savedMovie.language = req.body.language ? req.body.language : savedMovie.language
        savedMovie.releaseDate = req.body.releaseDate ? req.body.releaseDate : savedMovie.releaseDate

        savedMovie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : savedMovie.releaseStatus

        const updatedMovie = await savedMovie.save();
        return res.status(200).send(updatedMovie);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const results = await Movie.findOneAndDelete({
            _id: req.params.id
        })
        return res.status(200).send({
            message:`Successfully deleted movie with Id ${req.params.id}`
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.getTheatresForMovie = async (req,res)=>{
    const movie = req.params.movieId;
    try{

        const savedMovie = await Movie.findById({_id:movie});
        
        if(!savedMovie){
            return res.status(400).send({message:"Invalid movie id"});
        }
        
        const savedTheatre = await Theatre.find();
        const validTheatres = savedTheatre.filter(theatre=>theatre.movies.includes(movie));
        
        return res.status(200).send(validTheatres);
    }catch(err){
        return res.status.send({
            message:"Something went wrong."
        })
    }
}