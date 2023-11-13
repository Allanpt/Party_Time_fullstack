const router = require("express").Router()

const servicesRouter = require("./services")
const partyRouter = require("./party")

router.use("/", servicesRouter)
router.use("/", partyRouter)

module.exports = router