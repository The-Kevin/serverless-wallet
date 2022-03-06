import { check, ValidationChain, query } from 'express-validator';
import { TypeTransaction } from './models/Transactions';
import { handlePageAndLimitQuery } from '../../utils/validationChain';

export const createTransactionValidation = (): ValidationChain[] => [
  check('type')
    .exists()
    .withMessage({ id: 'required-type', message: 'Type of transaction is required.' })
    .bail()
    .isString()
    .isIn(Object.values(TypeTransaction))
    .withMessage({ id: 'invalid-type', message: 'Type query is invalid.' }),
  ,
  check('amount')
    .exists()
    .withMessage({ id: 'required-amount', message: 'Amount of transaction is required.' })
    .bail()
    .isNumeric()
    .withMessage({ id: 'invalid-amount', message: 'Amount query is invalid.' }),
  ,
];
export const listTransactionValidation = (): ValidationChain[] => [
  ...handlePageAndLimitQuery,
  query('type')
    .optional()
    .isString()
    .isIn(Object.values(TypeTransaction))
    .withMessage({ id: 'invalid-type', message: 'Type query is invalid.' }),
];
