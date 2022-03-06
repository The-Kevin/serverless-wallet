import { query } from 'express-validator';

export const handlePageAndLimitQuery = [
  query('page')
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage({ id: 'invalid-page', message: 'Page query is invalid.' }),
  query('limit')
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage({ id: 'invalid-limit', message: 'Limit query is invalid.' }),
];
