import { query } from 'express-validator';

export const handlePageAndLimitQuery = [
  query('page')
    .optional()
    .isNumeric()
    .withMessage({ id: 'invalid-page', message: 'Page query is invalid.' }),
  query('limit')
    .optional()
    .isNumeric()
    .withMessage({ id: 'invalid-limit', message: 'Limit query is invalid.' }),
];
