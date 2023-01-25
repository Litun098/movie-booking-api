const Theatre = require('../models/theatre')

exports.createTheatre = async (req, res) => {
    const theaterObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode
    }

    try {
        const theater = await Theatre.create(theaterObject);

        res.status(201).send(theater)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.getAllTheatre = async (req, res) => {
    const queryObj = {};

    if (req.query.pinCode !== undefined) {
        queryObj.pinCode = req.query.pinCode
    }
    if (req.query.name !== undefined) {
        queryObj.name = req.query.name
    }
    if (req.query.description !== undefined) {
        queryObj.description = req.query.description
    }
    if (req.query.city !== undefined) {
        queryObj.city = req.query.city
    }

    try {
        const theater = await Theatre.find(queryObj);

        return res.status(200).send(theater);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Somwthing went wrong."
        })
    }
}

exports.getTheatre = async (req, res) => {
    const id = req.params.id;

    try {
        const theater = await Theatre.findOne({
            _id: id
        })

        return res.status(200).send(theater);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.deleteTheatre = async (req, res) => {
    try {
        await Theatre.deleteOne({
            _id: req.params.id
        });

        res.status(200).send({ message: `Successfully deleted theatre with id:${req.params.id}` });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.updateTheatre = async (req, res) => {

    const id = req.params.id;

    try {
        const savedTheatre = await Theatre.findOne({ _id: req.params.id });

        if (!savedTheatre) {
            return res.status(400).send({ message: "Theatre doesn't exists" });
        }

        //update the theatre details 

        savedTheatre.name = req.body.name ? req.body.name : savedTheatre.name;
        savedTheatre.description = req.body.description ? req.body.description : savedTheatre.description;
        savedTheatre.city = req.body.city ? req.body.city : savedTheatre.city;
        savedTheatre.pinCode = req.body.pinCode ? req.body.pinCode : savedTheatre.pinCode;

        const updatedTheatre = await savedTheatre.save();

        res.status(200).send(updatedTheatre);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }
}

exports.addMoviesToTheatre = async (req, res) => {

    const theatreId = req.params.theatreId;

    try {


        const savedTheatre = await Theatre.findOne({ _id: theatreId });

        if (!savedTheatre) {
            return res.status(400).send({ message: "Theatre doesn't exists" });
        }

        const movieIds = req.body.movies;

        if (req.body.insert === true) {
            console.log("inside insert");
            movieIds.forEach(movieId => {
                savedTheatre.movies.push(movieId);
            })
        }
        else if (req.body.delete === true) {

            savedMovieIds = savedTheatre.movies.filter((movieId) => {
                return !movieIds.includes(movieId.toString());
            })
            savedTheatre.movies = savedMovieIds;
        }


        const updatedTheatre = await savedTheatre.save();
        return res.status(200).send(updatedTheatre);

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Something went wrong."
        })
    }

}