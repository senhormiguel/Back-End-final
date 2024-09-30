import express, { Express } from 'express';
import cors from 'cors';
import usersRouter from './routers/userRouter.js';
import moviesRouter from './routers/movieRouter.js';
import movieRouter from './routers/movieRouter.js';


const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(moviesRouter);

const PORT: number = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})