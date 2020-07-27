const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const logger = require('./../../middlewares/logger');
const authentication = require('./../../middlewares/authentication');


router.route('/')
    .get(controller.getTweets)
    .post(authentication,controller.newTweet)
    .delete(logger,controller.deleteTweet);

router.route('/comment').post(controller.newComment);
router.route('/:id').get(controller.getTweet);

router.route('/comments').delete(controller.deleteComment);
router.route('/lasts/:count').get(controller.lastTweets);
router.route('/top/commenters/:count').get(controller.usersTopTweets);

router.route('/:id/comments/count').get(controller.totalCommentsTweet);


module.exports = router;