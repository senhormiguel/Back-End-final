import { Router } from 'express';
import MovieController from '../controllers/movieController.js';
import movieController from '../controllers/movieController.js';
import movieController from '../controllers/movieController.ts';

const router: Router = Router();

// Get all movies
router.get('/movies', MovieController.getAll);

// Get movie by ID
router.get('/movies/:id', MovieController.getOne);

// Get movie by Title
router.get('/movies/:title', MovieController.getOne);

// Get movie by Poster
router.get('/movies/:poster', MovieController.getOne);

// Create a new movie (add)
router.post('/movies', MovieController.create);

// Update an existing movie: id
router.put('/movies/:id', MovieController.update);

// Update an existing movie: title
router.put('/movies/:title', MovieController.update);

// Delete an existing movie: id
router.delete('/movies/:id', MovieController.delete);

// Delete an existing movie: title
router.delete('/movies/:title', MovieController.delete);

export default router;