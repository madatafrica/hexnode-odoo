import axios from 'axios';
import { logger } from '../utils/logger.js';

export class OdooService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.ODOO_URL,
      auth: {
        username: process.env.ODOO_USERNAME,
        password: process.env.ODOO_PASSWORD
      }
    });
  }

  async createDevice(deviceData) {
    try {
      const response = await this.client.post('/api/mdm.device', deviceData);
      return response.data;
    } catch (error) {
      logger.error('Odoo device creation failed:', error);
      throw new Error('Failed to create device in Odoo');
    }
  }

  async getDeviceStatus(deviceId) {
    try {
      const response = await this.client.get(`/api/mdm.device/${deviceId}/status`);
      return response.data;
    } catch (error) {
      logger.error('Odoo device status fetch failed:', error);
      throw new Error('Failed to get device status from Odoo');
    }
  }

  async executeDeviceCommand(deviceId, command, params = {}) {
    try {
      const response = await this.client.post(
        `/api/mdm.device/${deviceId}/command/${command}`,
        params
      );
      return response.data;
    } catch (error) {
      logger.error(`Odoo device command ${command} failed:`, error);
      throw new Error(`Failed to execute ${command} command in Odoo`);
    }
  }

  async getDeviceInfo(deviceId) {
    try {
      const response = await this.client.get(`/api/mdm.device/${deviceId}`);
      return response.data;
    } catch (error) {
      logger.error('Odoo device info fetch failed:', error);
      throw new Error('Failed to get device info from Odoo');
    }
  }

  async listDevices(filters = {}) {
    try {
      const response = await this.client.get('/api/mdm.device', { params: filters });
      return response.data;
    } catch (error) {
      logger.error('Odoo device list fetch failed:', error);
      throw new Error('Failed to list devices from Odoo');
    }
  }
}