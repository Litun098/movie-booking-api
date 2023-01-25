const releaseStatusValue = require('../utils/constants').releaseStatus;

const validateMovieRequest = async (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter the movie name."
        })
    }

    if (!req.body.releaseStatus) {
        return res.status(400).send({
            message: "Failed! status is not provided."
        })
    }

    // check for correct value for release status;
    const releaseStatus = req.body.releaseStatus;

    const correctStatus = [releaseStatusValue.blocked, releaseStatusValue.released, releaseStatusValue.unreleased];

    if (!correctStatus.includes(releaseStatus)) {
        return res.status(400).send({
            message: `Failed! status should be ${correctStatus}`
        })
    }
    next();
}

module.exports = {
    validateMovieRequest
}