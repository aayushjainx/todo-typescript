import { ValidationChain, body } from 'express-validator';
import { Priority } from '../enums/priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .trim()
    .isString()
    .withMessage('Title must be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .trim()
    .isString()
    .withMessage('Date must be a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description must be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.medium])
    .withMessage('Priority must be high, low or medium'),
  body('status')
    .trim()
    .isIn([Status.completed, Status.todo, Status.inProgress])
    .withMessage('Status must be todo, in-progress or completed'),
];
