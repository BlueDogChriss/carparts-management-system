const router = require("express").Router();
const partsRouter = require('./parts')

router.use("/part", partsRouter);

module.exports = router;