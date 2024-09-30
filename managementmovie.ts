import { Request, Response } from 'express';
import { Movie } from '../Movies API/movieDetails.ts';
import { app } from '../Movies API/movieDetails.ts';
import { authenticateAdmin } from '../Movies API/movieDetails.ts';
import { MovieModel } from '../Movies API/movieDetails.ts';

app.post('/movies', authenticateAdmin, (req, res) => {
    const { title, releaseDate, trailerLink, poster, genres } = req.body;
    // Validate and sanitize data
    const movie = new Movie({ title, releaseDate, trailerLink, poster, genres });
    movie.save((err, movie) => {
      if (err) {
        res.status(500).send({ message: 'Error creating movie' });
      } else {
        res.send({ message: 'Movie created successfully' });
      }
    });
  });

  function authenticateAdmin(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    // Verify JWT token and check user role
    if (token && verifyToken(token) && isAdmin(req.user)) {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  }
  
  /*const Movie = sequelize.define('Movie', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: Sequelize.STRING,
    releaseDate: Sequelize.DATE
    trailerLink: Sequelize.STRING
    poster: Sequelize.STRING
    genders: Sequelize.STRING
  });*/

  app.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, releaseDate, trailerLink, poster, genres } = req.body;
  
    // Verify admin user
    if (!req.user.isAdmin) {
      return res.status(403).send({ message: 'Unauthorized' });
    }
  
    // Retrieve existing movie data
    const movie = await Movie.findByPk(id);
  
    if (!movie) {
      return res.status(404).send({ message: 'Movie not found' });
    }
  
    // Update movie data
    movie.title = title;
    movie.releaseDate = releaseDate;
    movie.trailerLink = trailerLink;
    movie.poster = poster;
    movie.genres = genres;
  
    await movie.save();
  
    res.send({ message: 'Movie updated successfully' });
  });

  function isAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send({ message: 'Only admins can delete movies' });
    }
  }

  function deleteMovie(req, res) {
    const title = req.params.title;
    // Retrieve the movie from the database
    MovieModel.findByIdAndRemove(title, (err, doc) => {
      if (err) {
        res.status(500).send({ message: 'Error deleting movie' });
      } else {
        res.status(200).send({ message: 'Movie deleted successfully' });
      }
    });
  }

  /*function deleteMovie(req, res) {
  const id = req.params.id;
  // Retrieve the movie from the database
  MovieModel.findByIdAndRemove(id, (err, doc) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting movie' });
    } else {
      res.status(200).send({ message: 'Movie deleted successfully' });
    }
  });
}*/