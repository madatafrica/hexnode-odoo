import { z } from 'zod';

export const DeviceSchema = z.object({
  name: z.string(),
  device_type: z.enum(['ios', 'android', 'windows']),
  udid: z.string(),
  serial_number: z.string().optional(),
  os_version: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  last_check_in: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive', 'pending', 'wiped']).default('pending'),
  ownership: z.enum(['corporate', 'byod']).default('corporate'),
  compliance_status: z.enum(['compliant', 'non_compliant']).default('compliant')
});