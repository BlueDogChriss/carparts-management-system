const express = require('express')
const PartsController = require("../controllers/parts")

const router = express.Router();


router.post('/', PartsController.addPart);
router.get('/',PartsController.getAllParts);
router.get('/detail/:id', PartsController.getPartNameById)
router.put('/:partId', PartsController.updateParts);
router.delete('/:partId', PartsController.deletePart);

module.exports = router;