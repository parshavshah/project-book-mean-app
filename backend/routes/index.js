const express = require('express');
const router = express.Router();

const controllers = require('../controllers').controllers
const validators = require('../validators').validators

const authUser = require('../helpers/user.helper').authUser

router.get('/', function (req, res, next) {
  res.send({ ok: ok });
});

// --- user
router.post('/user/login',
  controllers.userController.loginUser);

router.post('/user/verify',
  controllers.userController.verifyUser);

router.post('/user/register',
  validators.userSignup,
  controllers.userController.registerUser);


// --- project
router.post('/project',
  authUser,
  controllers.projectController.createProject)

router.get('/project',
  authUser,
  controllers.projectController.getAllProjects)

router.get('/project/my',
  authUser,
  controllers.projectController.getMyProject)

router.patch('/project',
  authUser,
  controllers.projectController.updateProject)

router.post('/project/comment',
  authUser,
  controllers.projectController.createComment)

router.patch('/project/comment',
  authUser,
  controllers.projectController.updateComment)

router.post('/project/like',
  authUser,
  controllers.projectController.addLike)

router.delete('/project/like',
  authUser,
  controllers.projectController.removeLike)

module.exports = router;
