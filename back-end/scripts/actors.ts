const faker = require('faker');

export const generateActorExternalId = () => {
  return {
    [faker.random.uuid()]: { ... generateActor() } };
};

export const generateActorInternalId = () => {
  return { id: faker.random.uuid(), ...generateActor() };
};

const generateActor = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName()
  };
};

