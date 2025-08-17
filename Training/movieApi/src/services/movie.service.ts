import { MovieRepository } from "../repositories/movie.repository";
import type { Movie } from "../interfaces/movie.interface";

export class MovieService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  getMovieById(id: number): Movie {
    const movie = this.movieRepository.searchMovieById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }

    return movie;
  }

  getAllMovies(): Movie[] {
    return this.movieRepository.showAllMovieBy();
  }
}
