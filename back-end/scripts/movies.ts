const faker = require('faker');

const allGenres = [
  'Drama', 'Comedy', 'Thriller', 'Action', 'Adventure', 'Documentary', 'Romance', 'War',
  'Animation', 'Crime', 'Sci-Fi', 'Fantasy', 'Mystery', 'Action', 'Horror', 'Musical', 'Western'
];

export const generateMovieExternalId = () => {
  return { [faker.random.uuid()]: { ...generateMovie() } };
};

export const generateMovieInternalId = () => {
  return { id: faker.random.uuid(), ...generateMovie() };
};

const generateMovie = () => {
  return {
    title: generateTitle(),
    genre: generateGenre(),
    year: generateYear(),
    director: `${faker.name.firstName()} ${faker.name.lastName()}`
  };
};

const generateTitle = () => {
  const title = faker.random.words();
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const generateYear = () => {
  return new Date().getFullYear() - Math.round(Math.random() * 60);
};

const generateGenre = () => {
  const count = Math.round(Math.random() * 4) + 1;
  let genres = '';

  for (let i = 0; i < count; i++) {
    const genreIndex = Math.round(Math.random() * allGenres.length);
    const genre = allGenres[genreIndex];
    genres = Boolean(genres.length) ? genres += ' | ' + genre : genres += genre;
  }

  return genres;
};

