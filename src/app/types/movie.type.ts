import { Director } from './director.type';
import { Genre } from './genre.type';

export type Movie = {
  _id: string,
  director: Director,
  genre: Genre,
  title: string,
  year: number,
  description: string,
  featured: boolean
};
