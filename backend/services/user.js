
const admin = require('firebase-admin');
const db = require('../firebase/firebase')

//todo debug heere
const findUserByEmail = async(email) => {
    let userFound = db.collection("users").where("email", "==", email)
    .get()
    .then(function(querySnapshot) {
        let user;
        querySnapshot.forEach(function(doc) {
            user = doc.data();
            user.id = doc.id;
        });
        return user;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return userFound;
};

module.exports = {
    findUserByEmail
}