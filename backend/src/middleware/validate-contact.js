import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(4).max(120),
  message: z.string().trim().min(20).max(2000)
});

export function validateContact(req, res, next) {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid contact payload.',
      errors: result.error.flatten().fieldErrors
    });
  }

  req.validatedContact = result.data;
  return next();
}
