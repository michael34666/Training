import express from "express";
import bodyParser from "body-parser";
import { MovieController } from "./controllers/movie.controller.js";

const movieController = new MovieController();

const app = express();
const port = process.env.PORT;

// basically tells the system that you want json to be used.
app.use(bodyParser.json());

//Get movie by ID
app.get("/movies/:id", (req, res) => movieController.getMovie(req, res));

// Get all movies
app.get("/movies", (req, res) => movieController.showAllMovies(req, res));

//add new movie
app.post("/movies", (req, res) => movieController.insertNewMovie(req, res));

//Edit movie data
app.put("/movies/:id", (req, res) => movieController.editMovie(req, res));

//Delete movie by ID
app.delete("/movies/:id", (req, res) => movieController.deleteMovie(req, res));

// start a server and make it listen for incoming requests on a specified port and host
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
