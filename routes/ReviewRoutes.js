const express = require('express');
const ReviewRouter = require('../controllers/ReviewController');

//ROUTES
const router = express.Router();

router.route('/')
      .get(ReviewRouter.getReviews)
      .post(ReviewRouter.createReview);

router
      .route('/:id')
      .get(ReviewRouter.getReview)
      .patch(ReviewRouter.updateReview)
      .delete(ReviewRouter.deleteReview);

module.exports = router;