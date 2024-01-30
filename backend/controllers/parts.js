const db = require('../firebase/firebase')

const getAllParts = async (req, res) => {
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

const savePart = async (req, res) => {
	console.log("test", req.body)
	try {
		const part = {
			code: req.body.code,
			price: req.body.price,
			name: req.body.name
		}
		//todo validaric
		console.log(part)
		await db.collection('parts').add(part);
		res.status(200).json({ message: "Success" });
	} catch (err) {
		res.status(500).json({ message: err.message });
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
	getAllParts,
	updateParts,
	savePart,
	deletePart,
	getPartNameById
}