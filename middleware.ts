import { Request, Response, NextFunction } from 'express';
import { express } from 'express';
import { app } from '/middleware.ts';
import { movieController } from '/middleware.ts';

const adminRoles = ['admin'];

function adminMiddleware(req, res, next) {
  if (!req.user || !adminRoles.includes(req.user.role)) {
    return res.status(403).send({ message: 'Unauthorized' });
  }
  next();
}

// routes.js
const adminRouter = express.Router();
adminRouter.use(adminMiddleware);

adminRouter.get('/categories', (req, res) => {
  // Only accessible by Admin users
  // ...
});

adminRouter.post('/assign-role', (req, res) => {
  // Only accessible by Admin users
  // ...
});

const isAdmin = (req, res, next) => {
    if (req.user.role === 'Admin') {
      next(); // Allow Admin to proceed
    } else {
      res.status(403).send({ message: 'Forbidden' }); // Return 403 Forbidden for non-Admin users
    }
  };
  
  
  movieController.createMovie = async (req, res) => {
    if (req.user.role === 'Admin') {
      // Create movie logic
    } else {
      res.status(403).send({ message: 'Forbidden' }); // Return 403 Forbidden for non-Admin users
    }
  };
  
  app.get('/movies', isAdmin, (req, res) => {
    // Return movie data for Admin users
  });
  
  app.post('/movies', isAdmin, (req, res) => {
    // Return movie data for Admin users
  });
  
  app.put('/movies', isAdmin, (req, res) => {
    // Return movie data for Admin users
  });
 
  app.delete('/movies', isAdmin, (req, res) => {
    // Return movie data for Admin users
  });
  app.get('/users', isAdmin, (req, res) => {
    
  });
  
  app.post('/users', isAdmin, (req, res) => {
   
  });
  
  app.put('/users', isAdmin, (req, res) => {
    
  });
 
  app.delete('/users', isAdmin, (req, res) => {
    
  });
