const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post("/:username/changepassword",userController.changePassword);
router.post("/:username/update",userController.updateUser);
router.get("/:username",userController.getUser);

module.exports = router;