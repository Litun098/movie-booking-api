const movieController = require('../controllers/movie.controller')

module.exports =function (app) {
    app.post('/mba/api/v2/movie',movieController.createMovie)
    app.get('/mba/api/v2/movie',movieController.getAllMovies)
    app.get('/mba/api/v2/movie/:id',movieController.getAllMovies)
}