const firebase = require('firebase');
const Helpers = require('../helpers');
const faker = require('faker');
const { fake } = require('faker');
const admin = require('firebase-admin');
const db = require('../firebase/firebase')

const generateMockCars = (req, res) => {
    let carsCount = req.body.cars_count ? req.body.cars_count : 5;
    try {
        for (let i = 0; i < itemCount.carsCount; i++) {
            carTable.push(car);
        }
        return res.send({ message: `${carsCount} were generated` })
        //TODO partsAdded (parts id, user id)
    } catch (err) {
        return res.send({ message: "Error " + err })
    }
};

const generateData = async (req, res) => {
    let initializationCount = req.body.count ? req.body.count : 5;


    for (let i = 0; i < initializationCount; i++) {
        console.log(initializationCount, i)
        let car = Helpers.cars.generateMockCar();
        await db.collection('cars').add(car);
        let part = Helpers.parts.generateMockPart();
        await db.collection('parts').add(part);
        let user = Helpers.users.generateMockUser();
        await db.collection('users').add(user);

        let partsOwnership = {
            ownerId: user.email,
            partId: part.code,
            quantity: faker.random.number()
        }
        await db.collection('stocks').add(partsOwnership);

    }
    return res.send({ message: "generated successfully" });
}

module.exports = {
    generateMockCars,
    generateData,
}