const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.newUser)
    .delete(controller.deleteUser);

router.route('/:id')
    .get(controller.getUser)
    .put(controller.updateUser);
router.route('/tweets/count').get(controller.totalTweetsbyUser);
router.route('/:id/tweets')
    .get(controller.getTweetsByUser);

module.exports = router;