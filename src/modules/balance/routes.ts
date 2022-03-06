import { Router } from 'express';
import passport from 'passport';

import { getBalance } from './controllers';

const routes = Router();

routes.route('/').get(passport.authenticate('jwt', { session: false }), getBalance);

export default routes;
