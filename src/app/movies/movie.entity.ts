import { Actor } from '../actors/actor.entity';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  director: string;
  actors?: Actor[];
}
