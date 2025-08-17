import type { NextFunction, Request, Response } from "express";
import { MovieService } from "../services/movie.service";
import type { Movie } from "../interfaces/movie.interface";
import status from "http-status";

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  getMovie = (req: Request, res: Response): void => {
    try {
      if (!req.params.id) {
        throw new Error("Id not found");
      }
      const movie = this.movieService.getMovieById(+req.params.id);
      res.status(status.OK).json(movie);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: "Movie not found" });
    }
  };

  showAllMovies = (_: Request, res: Response, next: NextFunction): void => {
    try {
      const movies = this.movieService.getAllMovies();
      res.status(status.OK).json(movies);
    } catch (error) {
      next(error);
    }
  };

  insertNewMovie = (req: Request, res: Response): void => {
    try {
      const movies = this.movieService.getAllMovies();
      const newMovie = { id: movies.length + 1, ...req.body };
      movies.push(newMovie);
      res.status(status.OK).json(newMovie);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: "Movie not found" });
    }
  };

  deleteMovie = (req: Request, res: Response): void => {
    try {
      const movies = this.movieService.getAllMovies();
      if (!req.params.id) {
        throw new Error("Id not found");
      }
      const deletedMovie = movies.splice(+req.params.id - 1, 1);
      res.status(status.OK).json(deletedMovie);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: "Movie not found" });
    }
  };

  editMovie = (req: Request, res: Response): void => {
    try {
      const movie = this.movieService.getMovieById(+req.params.id);
     
      movie.title = req.body.title;
      movie.overView = req.body.overView;
      movie.directorName = req.body.directorName;
      movie.genres = req.body.genre;
      movie.releaseDate = req.body.releaseDate;
      res.status(status.OK).json(movie);
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error });
    }
  };
}
