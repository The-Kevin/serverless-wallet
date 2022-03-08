import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './modules/routes';
import database from './database/mongoose';
import morgan from 'morgan';
import { usePassport } from './utils/passport-helper';

//require because the GRCP lib dont accept import/export

const grcp = require('@grpc/grpc-js');
const proto = require('./config/grpc/connection');
const FunctionsGRCP = require('./modules/transactions/grpc');

export const grpcServer = new grcp.Server();

grpcServer.addService(proto.TransactionService, FunctionsGRCP);
grpcServer.bindAsync('0.0.0.0:50051', grcp.ServerCredentials.createInsecure(), () => {
  grpcServer.start();
});

const app = express();

config();

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
  const port = process.env.LOCAL_PORT ?? 3001;
  app.listen(port, () => {
    console.log('Server Local On:', port);
  });
}

export default app;
