const faker = require('faker');

const generateMockPart = () => {
    return {
        name: faker.commerce.productName(),
        code: faker.random.alphaNumeric(7),
        price: faker.commerce.price(),
    };
}

module.exports = { generateMockPart }