import express from 'express';
import dotenv from 'dotenv';
import { deviceRouter } from './routes/device.js';
import { policyRouter } from './routes/policy.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api/v1/devices', deviceRouter);
app.use('/api/v1/policies', policyRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`MDM API server running on port ${port}`);
});