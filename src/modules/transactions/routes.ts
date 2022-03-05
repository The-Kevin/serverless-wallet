import { Router } from 'express';
import passport from 'passport';
import { createTransaction, listTransaction, getBalance } from './controllers';
import { createTransactionValidation, listTransactionValidation } from './validation';

const routes = Router();

routes
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    // listTransactionValidation(),
    listTransaction,
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    // createTransactionValidation(),
    createTransaction,
  );

routes.route('/balance').get(passport.authenticate('jwt', { session: false }), getBalance);

export default routes;
