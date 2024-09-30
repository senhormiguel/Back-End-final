import { Request, Response } from 'express';
import { app } from 'express';

const Comment = {
    title: String,
    text: String,
    trailerLink: String
  };
  
  // Endpoint
  app.post('/comments', (req, res) => {
    const { title, text } = req.body;
    // Input
    const comment = new Comment({ title, text });
    // Store in database
    comment.save((err, comment) => {
      if (err) {
        res.status(500).send({ message: 'Error saving comment' });
      } else {
        res.send({ message: 'Comment saved successfully' });
      }
    });
  });

  // Retrieve comments for a specific resource
/*app.get('/articles/:id/comments', (req, res) => {
    const articleId = req.params.id;
    Comment.find({ articleId }, (err, comments) => {
      if (err) {
        res.status(500).send({ message: 'Error retrieving comments' });
      } else {
        res.send(comments);
      }
    });
  });*/