import { z } from 'zod';

export const fingerprintMachineSchema = z.object({
  cloudId: z.string()
    .min(1, 'Cloud ID harus diisi')
    .min(3, 'Cloud ID minimal 3 karakter'),
  serialNumber: z.string()
    .min(1, 'Nomor Seri harus diisi')
    .min(3, 'Nomor Seri minimal 3 karakter'),
  machineName: z.string()
    .min(1, 'Nama Mesin Absensi harus diisi')
    .min(2, 'Nama Mesin Absensi minimal 2 karakter')
    .max(100, 'Nama Mesin Absensi maksimal 100 karakter'),
  webhookUrl: z.string()
    .url('Webhook URL harus berupa URL yang valid')
    .optional()
    .or(z.literal('')),
});

export type FingerprintMachineFormData = z.infer<typeof fingerprintMachineSchema>;
