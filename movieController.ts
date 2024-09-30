import { Request, Response } from 'express';
import { IMovie } from '../interfaces/interfaces.js';
import movieService from '../services/movieService.js';
// Add movies 
class MovieController {
  getAll = async (req: Request, res: Response) => {
    try {
      const movies: IMovie[] | undefined = await movieService.getAll();

      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get movies' });
    }
  }
  getOne = async (req: Request, res: Response) => {
    try {
      const movieId: string = req.params.id;

      const movie: IMovie | undefined = movieService.getMovieById(movieId);

      const movietitle: IMovie | undefined = movieService.getMovieByTitle(movieId);

      if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
      }

      if (!movie) {
        res.status(204).json({ 'Add Movie and found' });
      }

      if (!movietitle) {
        res.status(400).json({ error: 'Name of the movie not found' });
      }

      if (!movietitle) {
        res.status(200).json({ 'Name of the movie found' });
        return;
      }

      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get a movie' });
    }
  }
  create = async (req: Request, res: Response) => {
    try {
      const movieToCreate: IMovie = req.body;
      const createdMovie: any = movieService.create(movieToCreate);
      res.status(201).json(createdMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create (add) a movie' });
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      const movieId: string = req.params.id;
      const movieToUpdate: IMovie = req.body;
      const updatedMovie: IMovie | undefined = movieService.update(movieId, movieToUpdate);

      if (!updatedMovie) {
        res.status(404).json({ error: 'Movie not found' });
      }
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the movie' });
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const movieId: string = req.params.id;
      const deletedMovie: IMovie | undefined = movieService.delete(movieId);

      if (!deletedMovie) {
        res.status(404).json({ error: 'Movie not found' });
      }
      res.json(deletedMovie);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete a movie' });
    }
  }
}

export default new MovieController();