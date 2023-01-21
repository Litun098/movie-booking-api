const movieController = require('../controllers/movie.controller')
const movieRequestValidator = require('../middlewares/validateMovieRequest')

module.exports = function (app) {
    app.post('/api/v1/movie', [movieRequestValidator.validateMovieRequest], movieController.createMovie);
    app.get('/api/v1/movie', movieController.getAllMovies);
    app.get('/api/v1/movie/:id', movieController.getMovie);
    app.put("/api/v1/movie/:id", movieController.updateMovie);
    app.delete("/api/v1/movie/:id", movieController.deleteMovie);
}