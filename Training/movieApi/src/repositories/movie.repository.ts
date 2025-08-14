import movies from '../../movieData.json' with {type: 'json'};
import type {Movie} from '../interfaces/movie.interface.js'

export class MovieRepository{
    
    searchMovieById =  (id :number ):Movie | undefined=> 
    {
     return movies.find(i=>i.id===id);
    } 

     showAllMovieBy() :Movie [] 
    {
    return movies;
    }
    
}
