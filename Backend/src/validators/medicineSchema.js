import { z } from 'zod';

export const medicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  expiryDate: z.string().datetime(),
  usage: z.enum(['Before Meal', 'After Meal']),
  quantity: z.number().int().min(0)
});