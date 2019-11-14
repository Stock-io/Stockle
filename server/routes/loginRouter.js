const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.post('/in', loginController.verifyUser, (req, res) => {
    res.status(200).json(res.locals.user)
})

router.post('/up', loginController.createUser, (req, res) => {
    res.status(200).json(res.locals.user)
})

module.exports = router;