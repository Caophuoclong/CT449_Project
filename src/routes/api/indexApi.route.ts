const router = require("express").Router();
const controller = require("../../controllers/index");
router.get("/", controller.contact.read);
router.get("/:phone", controller.contact.read);
router.post("/create", controller.contact.create);
router.post("/remove/:phone", controller.contact.remove);
router.put("/update/:phone", controller.contact.update);

module.exports = router;
