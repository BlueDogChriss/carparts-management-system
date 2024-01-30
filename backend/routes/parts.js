const router = require('express').Router();
const { authorize } = require('../middlewares/authorize')
const PartsController = require('../controllers/parts')

router.post("/",  PartsController.savePart);
router.get('/', PartsController.getAllParts);
router.get('/detail/:id', PartsController.getPartNameById)
router.put('/:partId', PartsController.updateParts);
router.delete('/:partId', authorize, PartsController.deletePart);

module.exports = router;