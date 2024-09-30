import { IMovie } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';


const moviesJsonPath: string = './src/data/products.json';

class MovieService {
  private readMoviesJson(): IMovie[] | undefined {
    try {
      const data = JsonFileReader.read(moviesJsonPath);
      return data;
    } catch (error) {
      throw new Error('Failed to read the movies');
    }
  }

  private writeMoviesJson(movies: IMovie[]): void {
    try {
      JsonFileReader.write(moviesJsonPath, movies);
    } catch (error) {
      throw new Error('Failed to write movies');
    }
  }

  getAll = (): IMovie[] | undefined => {
    try {
      return this.readMoviesJson();
    } catch (error) {
      throw new Error('Failed to get all movies');
    }
  }
  // (movie: IMovie): IMovie | undefined => {}
  getMovieById = (movieId: string): IMovie | undefined => {
    try {
      const movies: IMovie[] | undefined = this.readMoviesJson();

      const foundMovie = movies?.find(movie => movie.id === movieId);

      return foundMovie;
    } catch (error) {
      throw new Error('Failed to get a movie by ID');
    }
  }

  create = (newMovie: IMovie): IMovie => {
    try {
      const movies: IMovie[] | undefined = this.readMoviesJson();
      if (!movies) {
        throw new Error('Failed to read movies');
      }
      // remove .id
      newMovie.id = uuidv4();

      movies?.push(newMovie);

      this.writeMoviesJson(movies);
      return newMovie;
    } catch (error) {
      throw new Error('Failed to create movie');
    }
  }
  // remove movieId: string,
  update = (movieId: string, movie: IMovie): IMovie | undefined => {
    try {
      const movies: IMovie[] | undefined = this.readMoviesJson();

      if (!movies) {
        throw new Error('Failed to read movies');
      }
      // remove => movie.id === movieId
      const movieIndex: number = movies.findIndex(movie => movie.id === movieId);

      if (movieIndex === -1) {
        return undefined;
      }
      const movieToUpdateWithId = { ...movies[movieIndex], ...movie } // Merge movie with Id or Title

      movies[movieIndex] = movieToUpdateWithId; // Update movie Id or Title

      this.writeMoviesJson(movies);
      return movieToUpdateWithId; // Title
    } catch (error) {
      throw new Error('Failed to update movie');
    }
  }
  delete = (movieId: string): IMovie | undefined => { //Alterar (movieID: string) para (movie: IMovie)
    try {
      const movies: IMovie[] | undefined = this.readMoviesJson();

      if (!movies) {
        throw new Error('Failed to read movies');
      }

      const movieIndex: number = movies.findIndex(movie => movie.id === movieId); //(movie)

      if (movieIndex === -1) {
        return undefined;
      }
      const arr = movies.splice(movieIndex, 1);

      console.log(arr);

      const deletedMovie = arr[0]; // Delete movie
      this.writeMoviesJson(movies);
      console.log(deletedMovie);


      return deletedMovie;
    } catch (error) {
      throw new Error('Failed to delete a movie');
    }
  }
}

export default new MovieService();