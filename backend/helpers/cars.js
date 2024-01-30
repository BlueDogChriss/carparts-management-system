const faker = require('faker');

const generateMockCar = () => {
    return {
        model: faker.vehicle.model(),
        manufacturer: faker.vehicle.manufacturer(),
    };
}

module.exports = { generateMockCar }