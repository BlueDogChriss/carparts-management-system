const router = require('express').Router();
const StockController = require('../controllers/stock');
// const { authorize } = require('../middlewares/authorize')

router.get('/', StockController.getStock);
// router.get('/beautify', StockController.getBeautifyStock);
router.put('/:stockId',  StockController.updateStockById);
router.delete('/:stockId',  StockController.deleteStockById);
router.post('/add/part',  StockController.addPartInStock);

module.exports = router;