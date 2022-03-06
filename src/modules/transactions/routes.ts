import { Router } from 'express';
import passport from 'passport';
import { validationMiddleware } from '@mobixtec/visse';
import { createTransaction, listTransaction, getBalance } from './controllers';
import { createTransactionValidation, listTransactionValidation } from './validation';

const routes = Router();

routes
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    listTransactionValidation(),
    validationMiddleware,
    listTransaction,
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    // createTransactionValidation(),
    // validationMiddleware,
    createTransaction,
  );

routes.route('/balance').get(passport.authenticate('jwt', { session: false }), getBalance);

export default routes;
