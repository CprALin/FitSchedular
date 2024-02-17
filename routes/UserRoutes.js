const express = require('express');
const UserRouter = require('../controllers/UserController');
const authController = require('../controllers/AuthController');

//ROUTES
const router = express.Router();    

router.post('/singup' , authController.singup);

router.post('/login' , authController.login);

router.get('/logout' , authController.logout);

router.route('/')
      .get(UserRouter.getAllUsers)
      .post(UserRouter.createUser);

router
      .route('/:id')
      .get(UserRouter.getUser)
      .patch(UserRouter.updateUser)
      .delete(UserRouter.deleteUser);

module.exports = router;