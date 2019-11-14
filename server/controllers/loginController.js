const models = require('../models/stockleModel');

const loginController = {};

loginController.createUser = (req, res, next) => {
    const { user } = req.body
    models.User.create({user_id: user, day: 0, score: 50000}, (err, data) => {
        if (err) {
            return next(err);
        }
        res.locals.user = data;
        return next()
    })
}

loginController.verifyUser = (req, res, next) => {
    const { user } = req.body
    models.User.findOne({user_id: user}, (err,data) => {
        if (err) {
            console.log("error")
            return next(err);
        }
        res.locals.user = data
        return next();
    })
}
module.exports = loginController;