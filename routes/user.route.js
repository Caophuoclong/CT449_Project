const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post("/:username/changepassword",userController.changePassword);
router.get("/:username/update",userController.updateUser);
router.get("/:username",userController.getUser);