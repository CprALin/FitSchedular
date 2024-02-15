const express = require('express');
const UserRouter = require('../controllers/UserController');

//ROUTES
const router = express.Router();

router.route('/')
      .get(UserRouter.getAllUsers)
      .post(UserRouter.createUser);

router
      .route('/:id')
      .get(UserRouter.getUser)
      .patch(UserRouter.updateUser)
      .delete(UserRouter.deleteUser);

module.exports = router;