const router = require("express").Router()

const partyController = require("../controllers/partyController")

router.route("/party").post((req, res) => partyController.create(req, res))
router.route("/party").get((req, res) => partyController.getAll(req, res))
router.route("/party/:id").get((req, res) => partyController.getById(req, res))
router.route("/party/:id").delete((req, res) => partyController.deleteById(req, res))
router.route("/party/:id").put((req, res) => partyController.updateById(req, res))

module.exports = router