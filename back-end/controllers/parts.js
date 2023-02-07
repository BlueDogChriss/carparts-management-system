const firebase = require("../Util/db")
const Parts = require("../models/parts")
// const db = require("../Firebase/firebase")

const db = firebase.firestore();

const addPart = async (req,res) => {
    console.log("alo", req.body)
    try {
        const part = {
            part_id: req.body.part_id,
            name: req.body.name,
            model: req.body.model,
            client:req.body.client
        }
        // todo validaric
        console.log(part)
        await db.collection('parts').add(part);
        res.status(200).json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllParts = async  (req,res) =>{
    const partsRef = db.collection('parts');
    const snapshot = await partsRef.get();
    let parts = [];
    snapshot.forEach(doc => {
        let currentPart = { ...doc.data() };
        currentPart.id = doc.id;
        parts.push(currentPart)
    });
    if (parts.length === 0) {
        return res.status(404).send({ message: "No parts found" })
    }
    return res.send(parts);
}

const getPartNameById = async (req, res) => {
    let part = await db.collection("parts").doc(req.params.id)
        .get()
        .then(function (querySnapshot) {
            let part = querySnapshot.data();
            return res.send(part)
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    return part;
}

const updateParts = async (req, res) => {
    try {
        const partId = req.params.partId;
        let part = { ...req.body };
        await db.collection("parts").doc(partId).update(part);
        res.status(200).json({ message: "Success" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const deletePart = async (req, res) => {
    try {
        const partId = req.params.partId;
        await db.collection("parts").doc(partId).delete();
        res.status(200).json({ message: "Part deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addPart,
    getAllParts,
    getPartNameById,
    updateParts,
    deletePart
}


