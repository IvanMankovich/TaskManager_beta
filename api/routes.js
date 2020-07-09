const express = require('express'),
      controller = require('./controller');

const router = express.Router();

router.route('/info').get(controller.getInfo);
router.route('/tasks').get(controller.getTasks);
router.route('/task').post(controller.addTask);
router.route('/changeStatus/:taskID').put(controller.changeTaskStatus);
router.route('/updateTask').post(controller.updateTask);
router.route('/task/:taskID').get(controller.getTask);
router.route('/task/:taskID').delete(controller.removeTask);
router.route('/user/:userID').get(controller.getUserInfo);
router.route('/users').get(controller.getUsersList);
router.route('/addComment/:taskID').post(controller.addComment);
router.route('/rateTask/:taskID').post(controller.rateTask);
router.route('/stat').get(controller.getStatistic);
router.route('/archive/:taskID').get(controller.getTaskFromArchive);
router.route('/signIn').post(controller.signIn);
router.route('/logIn').post(controller.logIn);
router.route('/logOut').get(controller.logOut);

module.exports = router;