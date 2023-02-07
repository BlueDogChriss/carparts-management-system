const firebase = require("../Util/db")
const Parts = require("../models/parts")

const db = firebase.firestore();

const getStock = async (req, res) => {
    const stockRef = db.collection('stock');
    const snapshot = await stockRef.get();
    let stocks = [];
    snapshot.forEach(doc => {
        let currentStock = { ...doc.data() };
        currentStock.id = doc.id;
        stocks.push(currentStock)
    });
    if (stocks.length === 0) {
        return res.status(404).send({ message: "No stocks found" })
    }
    return res.send(stocks);
}

const updateStockById = async (req, res) => {
    try {
        const stockId = req.params.stockId;
        let stock = { ...req.body };
        await db.collection("stock").doc(stockId).update(stock);
        res.status(200).json({ message: "Success" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const deleteStockById = async (req, res) => {
    try {
        const stockId = req.params.stockId;
        await db.collection("stock").doc(stockId).delete();
        res.status(200).json({ message: "Stocks deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addPartInStock = async (req, res) => {
    try {
        const stock = {
            part_id: req.body.part_id,
            quantity: req.body.quantity
        }
        // stock.ownerId = userId;
        await db.collection('stock').add(stock);
        res.status(200).json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//todo other gets
// get for retrieving data without IDs
module.exports = {
    getStock,
    updateStockById,
    deleteStockById,
    addPartInStock,
}