
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "ur url here"
});

let db = admin.firestore();

module.exports = db;
