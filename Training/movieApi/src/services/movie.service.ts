import { MovieRepository } from "../repositories/movie.repository.js";
import type { Movie } from "../interfaces/movie.interface.js";

export class MovieService {
  private movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
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
