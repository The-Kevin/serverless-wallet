import { Router } from 'express';
import transactionRoutes from './transactions/routes';
const routes = Router();

routes.use('/transactions', transactionRoutes);
export default routes;
