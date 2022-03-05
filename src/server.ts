import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './modules/routes';
import database from './database/mongoose';
import morgan from 'morgan';
import { usePassport } from './utils/passport-helper';

const app = express();

config();
//TODO: tests with db, remove this condition
if (process.env.NODE_ENV !== 'test') {
  database();
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

usePassport();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(routes);

routes.get('/', (_req, res) => {
  return res.send('<h1>Up!</h1>');
});

if (process.env.NODE_ENV === 'local') {
  const port = process.env.LOCAL_PORT ?? 3002;
  app.listen(port, () => {
    console.log('Server Local On:', port);
  });
}

export default app;
