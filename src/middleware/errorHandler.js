import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('API Error:', err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.errors
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};