const Movie = require('../models/movie');

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
    try {
        const movie = await Movie.find();
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
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}