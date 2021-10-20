const express = require('express');
const controller = require("../controllers/contact.controller");
const router = express.Router();

router.get("/", controller.getAll);
router.get("/getBy", controller.getBy);
router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.put("/update/:phone", controller.update);
router.put("/favorite/:id", controller.favorite);
router.delete("/delete/:phone", controller.deleteByPhone);
router.delete("/delete", controller.deleteAll);


module.exports = router;