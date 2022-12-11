export type User = {
  _id: string,
  name: string,
  password: string,
  email: string,
  birthday: Date | null,
  favoriteMovies: string[]
};
