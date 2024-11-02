import { OdooService } from '../services/odooService.js';
import { logger } from '../utils/logger.js';
import { DeviceSchema } from '../schemas/deviceSchema.js';

export class DeviceController {
  constructor() {
    this.odooService = new OdooService();
  }

  async enrollDevice(req, res) {
    try {
      const deviceData = DeviceSchema.parse(req.body);
      const enrolledDevice = await this.odooService.createDevice(deviceData);
      
      res.status(201).json({
        success: true,
        data: enrolledDevice
      });
    } catch (error) {
      logger.error('Device enrollment failed:', error);
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getDeviceStatus(req, res) {
    try {
      const { deviceId } = req.params;
      const status = await this.odooService.getDeviceStatus(deviceId);
      
      res.json({
        success: true,
        data: status
      });
    } catch (error) {
      logger.error('Failed to get device status:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async lockDevice(req, res) {
    try {
      const { deviceId } = req.params;
      await this.odooService.executeDeviceCommand(deviceId, 'lock', req.body);
      
      res.json({
        success: true,
        message: 'Device lock command sent successfully'
      });
    } catch (error) {
      logger.error('Device lock failed:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async wipeDevice(req, res) {
    try {
      const { deviceId } = req.params;
      await this.odooService.executeDeviceCommand(deviceId, 'wipe', req.body);
      
      res.json({
        success: true,
        message: 'Device wipe command sent successfully'
      });
    } catch (error) {
      logger.error('Device wipe failed:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async locateDevice(req, res) {
    try {
      const { deviceId } = req.params;
      const location = await this.odooService.executeDeviceCommand(deviceId, 'locate');
      
      res.json({
        success: true,
        data: location
      });
    } catch (error) {
      logger.error('Device location failed:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getDeviceInfo(req, res) {
    try {
      const { deviceId } = req.params;
      const deviceInfo = await this.odooService.getDeviceInfo(deviceId);
      
      res.json({
        success: true,
        data: deviceInfo
      });
    } catch (error) {
      logger.error('Failed to get device info:', error);
      res.status(404).json({
        success: false,
        error: error.message
      });
    }
  }

  async listDevices(req, res) {
    try {
      const devices = await this.odooService.listDevices(req.query);
      
      res.json({
        success: true,
        data: devices
      });
    } catch (error) {
      logger.error('Failed to list devices:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}