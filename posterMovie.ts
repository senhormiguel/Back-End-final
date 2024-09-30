import { Request, Response } from 'express';

const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'Dune_2.jpg'))); //public= nome do poster.jpg ou jpeg/png
app.use(express.static(path.join(__dirname, 'Deadpool_&_Wolverine')));
app.use(express.static(path.join(__dirname, 'Joker')));
app.use(express.static(path.join(__dirname, 'Gladiador_2')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));