import movies from '../movieData.json' with {type: 'json'};
import express from 'express';
import bodyParser from 'body-parser';

import { MovieController } from './controllers/movie.controller.js';
import { MovieService } from './services/movie.service.js';
import { MovieRepository } from './repositories/movie.repository.js';


const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);
const movieController = new MovieController(movieService);


const app = express();
const port=process.env.PORT;

// basically tells the system that you want json to be used.
app.use(bodyParser.json());

//Get movie by ID -work
app.get('/movies/:id',(req,res)=> movieController.getMovie(req,res));

// Get all movies -work 
app.get('/movies', (req,res)=>movieController.showAllMovies(req,res));

//add new movie -work
app.post('/movies', (req,res)=>movieController.insertNewMovie(req,res));


//Edit movie data 
app.put('/movies/:id',(req,res)=> movieController.editMovie(req,res));


//Delete movie by ID
app.delete('/movies/:id',(req,res)=>movieController.deleteMovie(req,res));

// start a server and make it listen for incoming requests on a specified port and host
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});