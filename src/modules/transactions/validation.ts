import { ValidationChain, query, check } from 'express-validator';
import { TypeTransaction } from './models/Transactions';
import { UserModel } from '../../database/mongoose';
import { handlePageAndLimitQuery } from '../../utils/validationChain';
import { TokenData } from '../../utils/passport-helper';

export const createTransactionValidation = (): ValidationChain[] => [
  check('receiver_id')
    .exists()
    .withMessage({ id: 'required-receiver-id', message: 'Receiver id of transaction is required.' })
    .bail()
    .isString()
    .notEmpty()
    .custom(async (receive_id: string, { req }) => {
      if ((req.user as TokenData)._id.toString() === receive_id) {
        return Promise.reject();
      }
      const check = await UserModel.exists({ _id: receive_id });
      if (!check) return Promise.reject();
      return Promise.resolve();
    })
    .withMessage({
      id: 'invalid-receiver-id',
      message: 'Receiver id of transaction is invalid.',
    }),
  check('type')
    .exists()
    .withMessage({ id: 'required-type', message: 'Type of transaction is required.' })
    .bail()
    .isString()
    .isIn(Object.values(TypeTransaction))
    .withMessage({ id: 'invalid-type', message: 'Type query is invalid.' }),
  check('amount')
    .exists()
    .withMessage({ id: 'required-amount', message: 'Amount of transaction is required.' })
    .bail()
    .isNumeric()
    .withMessage({ id: 'invalid-amount', message: 'Amount query is invalid.' }),
];
export const listTransactionValidation = (): ValidationChain[] => [
  ...handlePageAndLimitQuery,
  query('type')
    .optional()
    .isString()
    .isIn(Object.values(TypeTransaction))
    .withMessage({ id: 'invalid-type', message: 'Type query is invalid.' }),
];
