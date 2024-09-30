import { Request, Response } from 'express';

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateToken = (user) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = jwt.sign(user, tokenSecret, { expiresIn: '1h' });
    return token;
  };

  app.use('/api/*', authenticateToken);

  app.get('/api/protected', (req, res) => {
    if (!req.user) return res.status(403).send('Unauthorized');
    // authorized user, proceed with request
  });