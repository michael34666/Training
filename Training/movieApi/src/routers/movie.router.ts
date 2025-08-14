import express from "express";
import { MovieController } from "../controllers/movie.controller";

const movieController = new MovieController();

export const movieRouter = express.Router();

// works only if the controller method is an arrow function - it preserves the this context. if done arraow dunction dont need (req,res)=>
movieRouter.get("/:id", movieController.getMovie);
movieRouter.get("/", movieController.showAllMovies);
movieRouter.post("/", movieController.insertNewMovie);
movieRouter.put("/:id", movieController.editMovie);
movieRouter.delete("/:id", movieController.deleteMovie);
