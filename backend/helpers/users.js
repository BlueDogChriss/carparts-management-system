const faker = require('faker');

const generateMockUser = () => {
    return {
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        lastName: faker.name.lastName(),
        phone: faker.phone.phoneNumber(),
        password: faker.internet.password(),
    };
}

module.exports = { generateMockUser }