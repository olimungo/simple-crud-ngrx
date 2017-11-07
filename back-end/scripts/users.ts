const faker = require('faker');

export const generateUser = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName()
  };
};

