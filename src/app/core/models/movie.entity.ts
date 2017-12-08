import { Actor } from './actor.entity';

export interface Movie {
  id: string;
  title: string;
  genres: string[];
  year: number;
  director: string;
  actors?: Actor[];
}
