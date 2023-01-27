const theatreController = require("../controllers/theatre.controller");

module.exports = function (app) {

    app.post("/mba/api/v1/theatres", theatreController.createTheatre);
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatre);
    app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
    app.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:theatreId/movies", theatreController.addMoviesToTheatre)
}