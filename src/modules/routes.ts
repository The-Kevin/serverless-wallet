import { Router } from 'express';
import transactionRoutes from './transactions/routes';
import balanceRoutes from './balance/routes';
const routes = Router();

routes.use('/transactions', transactionRoutes);
routes.use('/balance', balanceRoutes);
export default routes;
