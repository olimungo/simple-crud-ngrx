const faker = require('faker');

export const generateUserExternalKey = () => {
  return {
    [faker.random.uuid()]: { ... generateUser() } };
};

export const generateUserInternalKey = () => {
  return { id: faker.random.uuid(), ...generateUser() };
};

const generateUser = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName()
  };
};

