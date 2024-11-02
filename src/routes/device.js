import express from 'express';
import { DeviceController } from '../controllers/deviceController.js';
import { validateAuth } from '../middleware/auth.js';

const router = express.Router();
const deviceController = new DeviceController();

router.use(validateAuth);

// Device enrollment
router.post('/enroll', deviceController.enrollDevice);

// Device status
router.get('/:deviceId/status', deviceController.getDeviceStatus);

// Device commands
router.post('/:deviceId/lock', deviceController.lockDevice);
router.post('/:deviceId/wipe', deviceController.wipeDevice);
router.post('/:deviceId/locate', deviceController.locateDevice);

// Device information
router.get('/:deviceId', deviceController.getDeviceInfo);
router.get('/', deviceController.listDevices);

export { router as deviceRouter };