const router = require('express').Router();
const StockController = require('../controllers/stock');
const { authorize } = require('../middlewares/authorize')

router.get('/', StockController.getStock);
// router.get('/beautify', StockController.getBeautifyStock);
router.put('/:stockId', authorize, StockController.updateStockById);
router.delete('/:stockId', authorize, StockController.deleteStockById);
router.post('/add/part', authorize, StockController.addPartInStock);

module.exports = router;