const authController = require('../controllers/auth.controllers');
const {validateUserRequestBody} = require('../middlewares/validateUserReqBody');

module.exports = function (app) {
    app.post("/mba/api/v1/auth/signup",[validateUserRequestBody], authController.signup);
    app.post("/mba/api/v1/auth/signin", authController.signin);
}