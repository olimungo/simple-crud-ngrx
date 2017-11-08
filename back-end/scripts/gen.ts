import { generateUserExternalKey, generateUserInternalKey } from './users';
import { generateMovieExternalKey, generateMovieInternalKey } from './movies';

const fs = require('fs');
const faker = require('faker');

enum Mode { InternalKeys, ExternalKeys }

const mode = Mode.InternalKeys;
const COUNT = 15;
let users, movies;

if (mode === Mode.ExternalKeys as Mode) {
  users = {};
  movies = {};

  for (let i = 0; i < COUNT; i++) {
    users = { ...users, ...generateUserExternalKey() };
    movies = { ...movies, ...generateMovieExternalKey() };
  }
} else {
  users = [];
  movies = [];

  for (let i = 0; i < COUNT; i++) {
    users.push(generateUserInternalKey());
    movies.push(generateMovieInternalKey());
  }
}

fs.writeFile('db.json', JSON.stringify({ users, movies }), error => {
  if (error) {
    return console.log(error);
  }
});
