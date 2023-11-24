import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRouter } from './modules/user/user.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
   res.send('Welcome to this API.');
});

export default app;
