import movies from '../movieData.json' with {type: 'json'};
import express from 'express';
import bodyParser from 'body-parser';

export interface Movie{
 id:number;
 title:string;
 overView:string;
 directorName:string;
 genres:string [];
 releaseDate:Date;
}

const app = express();
const port=3000;
// basically tells the system that you want json to be used.
app.use(bodyParser.json());

//Get movie by ID 
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(i=>i.id===parseInt(req.params.id));
    if(!movie)
    {
      return res.status(404).send("Movie is not found");
    }
    res.json(movie);
    
 
});

// Get all movies 
app.get('/movies', (req,res)=>{
    res.json(movies);
});

//add new movie 
app.post('/movies', (req, res) => {
    const newMovie= {id: movies.length + 1,...req.body };
    movies.push(newMovie);
    res.status(201).json(newMovie); //201-sucess in add
 
});

//Edit movie data
app.put('/movies/:id', (req, res) => {
   const movie = movies.find(i => i.id === parseInt(req.params.id));
    if (!movie) 
    {
      return res.status(404).send('Movie is not found');
    }
    
    movie.title = req.body.title;  
    movie.overView = req.body.overView;  
    movie.directorName = req.body.directorName;
    movie.genre = req.body.genre;  
    movie.releaseDate = req.body.releaseDate;
    res.json(movie);
});

//Delete movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieId = movies.findIndex(i=> i.id===parseInt(req.params.id));
  if(movieId===-1) {return res.status(404).send('Movie is not found');}
  const deletedMovie =movies. splice(movieId , 1);
  res.json(deletedMovie);
});

// start a server and make it listen for incoming requests on a specified port and host
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});