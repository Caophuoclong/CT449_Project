const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.put("/:username/changepassword",userController.changePassword);
router.put("/:username/update",userController.updateUser);
router.get("/:username",userController.getUser);

module.exports = router;