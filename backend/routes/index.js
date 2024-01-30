const router = require('express').Router();
const partsRouter = require('./parts');
const userRouter = require('./users');
const carRouter = require('./cars');
const stockRouter = require('./stocks');
const GenerationController = require('../controllers/generate');
const admin = require('firebase-admin');

const _ = require('lodash')

router.get('/test', async (req, res) => {
    const db = admin.firestore();

    const result = await db.collection('users').add({
        id: _.uniqueId(),
        email: 'munteanucristiantest@gmail.com',
        password: 'test'
      });
    res.send(result)
});
router.use("/part", partsRouter);
router.use("/user", userRouter);
router.use("/cars", carRouter);
router.use("/stock", stockRouter);
router.get("/generate", GenerationController.generateData);

module.exports = router;

