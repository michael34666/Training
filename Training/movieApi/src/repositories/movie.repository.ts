import movies from "../../movieData.json";
import type { Movie } from "../interfaces/movie.interface";

export class MovieRepository {
  searchMovieById = (id: number): Movie | undefined => {
    return movies.find((i) => i.id === id);
  };

  showAllMovieBy(): Movie[] {
    return movies;
  }
}
