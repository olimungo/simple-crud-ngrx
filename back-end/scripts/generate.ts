import { generateActorExternalId, generateActorInternalId } from './actors';
import { generateMovieExternalId, generateMovieInternalId } from './movies';
import { generateMoviesActorsExternalId, generateMoviesActorsInternalId } from './movies-actors';

const fs = require('fs');
const faker = require('faker');

enum Mode { InternalIds, ExternalIds }

const mode = Mode.InternalIds;
const COUNT = 5;
let actors, movies, actorsId, moviesId, actorsMovies;

if (mode === Mode.ExternalIds as Mode) {
  actors = {};
  movies = {};
  actorsId = [];
  moviesId = [];

  for (let i = 0; i < COUNT; i++) {
    const newActor = generateActorExternalId();
    const newMovie = generateMovieExternalId();

    actorsId.push(Object.keys(newActor)[0]);
    moviesId.push(Object.keys(newMovie)[0]);

    actors = { ...actors, ...newActor };
    movies = { ...movies, ...newMovie };
  }

  actorsMovies = generateMoviesActorsExternalId(actorsId, moviesId);
} else {
  actors = [];
  movies = [];
  actorsId = [];
  moviesId = [];

  for (let i = 0; i < COUNT; i++) {
    const newActor = generateActorInternalId();
    const newMovie = generateMovieInternalId();

    actorsId.push(newActor.id);
    moviesId.push(newMovie.id);

    actors.push(newActor);
    movies.push(newMovie);
  }

  actorsMovies = generateMoviesActorsInternalId(actorsId, moviesId);
}

fs.writeFile('db.json', JSON.stringify({ actors, movies, 'movies-actors': actorsMovies  }), error => {
  if (error) {
    return console.log(error);
  }
});
