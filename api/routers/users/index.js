const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');
const logger = require('./../../middlewares/logger');

router.route('/')
    .get(controller.getAll)
    .post(logger,controller.newUser)
    .delete(logger,controller.deleteUser);

router.route('/:id')
    .get(controller.getUser)
    .put(logger, controller.updateUser);

router.route('/login').post(logger, controller.loginUser);

router.route('/tweets/count').get(controller.totalTweetsbyUser);

router.route('/:id/tweets').get(controller.getTweetsByUser);



module.exports = router;