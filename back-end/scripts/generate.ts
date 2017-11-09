import { generateActorExternalId, generateActorInternalId } from './actors';
import { generateMovieExternalId, generateMovieInternalId } from './movies';

const fs = require('fs');
const faker = require('faker');

enum Mode { InternalIds, ExternalIds }

const mode = Mode.InternalIds;
const COUNT = 50;
let actors, movies;

if (mode === Mode.ExternalIds as Mode) {
  actors = {};
  movies = {};

  for (let i = 0; i < COUNT; i++) {
    actors = { ...actors, ...generateActorExternalId() };
    movies = { ...movies, ...generateMovieExternalId() };
  }
} else {
  actors = [];
  movies = [];

  for (let i = 0; i < COUNT; i++) {
    actors.push(generateActorInternalId());
    movies.push(generateMovieInternalId());
  }
}

fs.writeFile('db.json', JSON.stringify({ actors, movies }), error => {
  if (error) {
    return console.log(error);
  }
});
