const express = require('express');
const ReviewRouter = require('../controllers/ReviewController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();

router.use(authController.protect);

router.post('/:appointmentId/addReview' , ReviewRouter.createReview);

router.route('/')
      .get(ReviewRouter.getReviews);

router
      .route('/:id')
      .get(ReviewRouter.getReview)
      .patch(ReviewRouter.updateReview)
      .delete(ReviewRouter.deleteReview);

module.exports = router;