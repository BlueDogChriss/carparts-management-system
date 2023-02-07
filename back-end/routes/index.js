const router = require("express").Router();
const partsRouter = require('./parts')
const stockRouter = require('./stock');

router.use("/part", partsRouter);
router.use("/stock", stockRouter);

module.exports = router;