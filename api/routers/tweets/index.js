const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet)
    .delete(controller.deleteTweet);

router.route('/comment').post(controller.newComment);
router.route('/:id').get(controller.getTweet);

router.route('/comments').delete(controller.deleteComment);
router.route('/lasts/:count').get(controller.lastTweets);
router.route('/top/commenters/:count').get(controller.usersTopTweets);
router.route('/:id/comments/count').get(controller.totalCommentsTweet);

router.route('/top/:count').get(controller.commentsTopTweets);
module.exports = router;