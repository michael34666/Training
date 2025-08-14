import type { Request, Response } from "express";
import { MovieService } from "../services/movie.service.js";

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  getMovie(req: Request, res: Response): void {
    const movieId = parseInt(req.params.id ?? "");
    try {
      const movie = this.movieService.getMovieById(movieId);
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json({ error: "Movie not found" });
    }
  }

  showAllMovies(req: Request, res: Response): void {
    try {
      const movies = this.movieService.getAllMovies();
      res.status(200).json(movies);
    } catch (error) {
      res.status(404).json({ error: "Movie not found" });
    }
  }

  insertNewMovie(req: Request, res: Response): void {
    try {
      const movies = this.movieService.getAllMovies();
      const newMovie = { id: movies.length + 1, ...req.body };
      movies.push(newMovie);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(404).json({ error: "Movie not found" });
    }
  }

  deleteMovie(req: Request, res: Response): void {
    const movieId = parseInt(req.params.id ?? " ");
    try {
      const movies = this.movieService.getAllMovies();
      const deletedMovie = movies.splice(movieId - 1, 1);
      res.status(200).json(deletedMovie);
    } catch (error) {
      res.status(404).json({ error: "Movie not found" });
    }
  }

  editMovie(req: Request, res: Response): void {
    const movieId = parseInt(req.params.id ?? "");
    try {
      const movie = this.movieService.getMovieById(movieId);
      if (!movie) {
        res.status(404).json({ error: "Movie not found" });
      }
      movie.title = req.body.title;
      movie.overView = req.body.overView;
      movie.directorName = req.body.directorName;
      movie.genres = req.body.genre;
      movie.releaseDate = req.body.releaseDate;
      res.status(200).json(movie);
    } catch (error) {
      res.status(404).json({ error: "Movie not found" });
    }
  }
}
