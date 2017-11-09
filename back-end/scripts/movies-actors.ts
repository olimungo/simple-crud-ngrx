export const generateMoviesActorsExternalId = (actorsId: Array<string>, moviesId: Array<string>) => {
  const moviesActors = generateMoviesActors(actorsId, moviesId);
  const moviesActorsLength = moviesActors.length;
  let finalMoviesActors = {};

  for (let i = 0; i < moviesActorsLength; i++) {
    let finalActors = {};
    const randomActorsLength = moviesActors[i].actors.length;

    for (let j = 0; j < randomActorsLength; j++) {
      finalActors = { ...finalActors, [moviesActors[i].actors[j]]: true };
    }

    finalMoviesActors = { ...finalMoviesActors, [moviesActors[i].id]: finalActors };
  }

  return finalMoviesActors;
};

export const generateMoviesActorsInternalId = (actorsId: Array<string>, moviesId: Array<string>) => {
  return generateMoviesActors(actorsId, moviesId);
};

const generateMoviesActors = (actorsId: Array<string>, moviesId: Array<string>) => {
  const moviesActors = [];
  const length = moviesId.length;

  for (let i = 0; i < length; i++) {
    moviesActors.push({ id: moviesId[i], actors: getRandomActors(actorsId) });
  }

  return moviesActors;
};

const getRandomActors = (actorsId: Array<string>) => {
  const randomActors = [];
  const actorsCount = Math.floor(Math.random() * 5) + 1;
  const length = actorsId.length;


  for (let i = 0; i < actorsCount; i++) {
    const random = Math.floor(Math.random() * actorsId.length);
    randomActors.push(actorsId[random]);
  }

  return randomActors;
};

