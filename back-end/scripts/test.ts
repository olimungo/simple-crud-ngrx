import { generateUser } from './users';
import { generateMovie } from './movies';

const fs = require('fs');
const faker = require('faker');

const COUNT = 15;
let users = {};
let movies = {};

const toto = 'toto';

export const generateUuid = () => {
  return faker.random.uuid();
};

for (let i = 0; i < COUNT; i++) {
  movies = { ...movies, [generateUuid()]: generateMovie() };
}

for (let i = 0; i < COUNT; i++) {
  users = { ...users, [generateUuid()]: generateUser() };
}

fs.writeFile('db.json', JSON.stringify({ users, movies }), error => {
  if (error) {
    return console.log(error);
  }
});

