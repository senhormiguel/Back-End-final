import { Request, Response } from 'express';
import { IMovie } from '../interfaces/interfaces.js';
import { Movie } from '../interfaces/interfaces.js';
import { adminMiddleware } from '../interfaces/interfaces.js';
import { router } from '../interfaces/interfaces.js';
import { app } from '../src/router/movieRouter.ts';

const movieRouter = express.Router();

movieRouter.use(express.json());

movieRouter.post('./Server/src/admin/movies', (req, res) => {
  // Validate and sanitize the request body
  const { title, releaseDate, trailerLink, poster, genders } = req.body;

  // Create a new Movie instance (assuming a Movie model exists)
  const movie = new Movie({ title, releaseDate, trailerLink, poster, genders });

  // Save the movie to the database (e.g., using MongoDB or a SQL database)
  movie.save((err, movie) => {
    if (err) {
      res.status(500).send({ message: 'Error creating movie' });
    } else {
      res.json({ message: 'Movie created successfully', movie });
    }
  });
});


router.route('/api/movies/:id').put(adminMiddleware, updateMovie);

function updateMovie(req, res) {
  const id = req.params.id;
  const movieData = req.body;

  // Find the movie document with the specified ID
  Movie.findOne({ _id: id }, (err, movie) => {
    if (err) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    // Update the movie document with the new data
    Object.assign(movie, movieData);

    // Save the updated movie document
    movie.save((err) => {
      if (err) {
        return res.status(500).send({ message: 'Error updating movie' });
      }

      res.json({ message: 'Movie updated successfully' });
    });
  });
}

app.delete('/api/movies/:title', adminMiddleware, (req, res) => {
    const id = req.params.title;
    // Retrieve the movie from the database
    Movie.findByIdAndRemove(title, (err) => {
      if (err) {
        res.status(404).send({ message: 'Movie not found' });
      } else {
        res.send({ message: 'Movie deleted successfully' });
      }
    });
  });
  
  

app.use('./Server/src/admin/movies', movieRouter);