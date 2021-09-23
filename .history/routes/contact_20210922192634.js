const express = require('express');
const router = express.Router();

router.get("/", controller.getAll);
router.get("/getBy", controller.getOneByPhone);
router.post("/create", controller.create);
router.put("/update", controller.update);
router.delete("/delete", controller.delete);


module.exports = router;