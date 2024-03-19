const express = require('express');
const UserRouter = require('../controllers/UserController');
const authController = require('../controllers/AuthController');
const path = require('path');


//ROUTES
const router = express.Router();    


router.post('/singup' , authController.singup);

router.post('/login' , authController.login);

router.get('/logout' , authController.logout);

router.post('/forgotPassword' , authController.forgotPassword);

router.patch('/resetPassword/:token' , authController.resetPassword);

router.use(authController.protect);

router.get('/getUserPhoto/:fileName' , (req , res) => {
    const filename = req.params.fileName;

    const imagePath = path.join(__dirname, '../img/users', filename);

    res.sendFile(imagePath);
});

router.patch('/updateMyPassword' , authController.updatePassword);

router.patch('/updateMe' , UserRouter.uploadUserPhoto, UserRouter.resizeUserPhoto , UserRouter.updateMe);

router.get('/me' , UserRouter.getMe , UserRouter.getUser);

router.delete('/deleteMe' , UserRouter.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/')
      .get(UserRouter.getAllUsers)
      .post(UserRouter.createUser);

router
      .route('/:id')
      .get(UserRouter.getUser)
      .patch(UserRouter.updateUser)
      .delete(UserRouter.deleteUser);

module.exports = router;