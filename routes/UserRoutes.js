const express = require('express');
const UserRouter = require('../controllers/UserController');
const authController = require('../controllers/AuthController');


//ROUTES
const router = express.Router();    


router.post('/singup' , authController.singup);

router.post('/login' , authController.login);

router.get('/logout' , authController.logout);

router.post('/forgotPassword' , authController.forgotPassword);

router.patch('/resetPassword/:token' , authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword' , authController.updatePassword);

router.patch('/updateProfile/:id', UserRouter.uploadUserPhoto, UserRouter.resizeUserPhoto , UserRouter.updateUser);

router.get('/me' , UserRouter.getMe , UserRouter.getUser);

router.delete('/deleteMe' , UserRouter.deleteMe);

router.use(authController.restrictTo('admin'));

router.patch('/updateMe' , UserRouter.uploadUserPhoto, UserRouter.resizeUserPhoto , UserRouter.updateMe);

router.route('/')
      .get(UserRouter.getAllUsers)
      .post(UserRouter.createUser);

router
      .route('/:id')
      .get(UserRouter.getUser)
      .patch(UserRouter.updateUser)
      .delete(UserRouter.deleteUser);

module.exports = router;