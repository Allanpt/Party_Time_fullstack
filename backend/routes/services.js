const router = require("express").Router()

const serviceController = require("../controllers/serviceController")

router.route("/services").post((req, res) => serviceController.create(req, res))
router.route("/services").get((req, res) => serviceController.getAll(req, res))
router.route("/services/:id").get((req, res) => serviceController.getById(req, res))
router.route("/services/:id").delete((req, res) => serviceController.deleteById(req, res))
router.route("/services/:id").put((req, res) => serviceController.updateById(req, res))

module.exports = router