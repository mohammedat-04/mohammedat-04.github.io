import crypto from 'node:crypto';
import { messageStore } from '../services/message-store.service.js';

export async function createContactMessage(req, res, next) {
  try {
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'new',
      ...req.validatedContact
    };

    await messageStore.save(entry);

    return res.status(201).json({
      id: entry.id,
      message: 'Message received successfully. I will get back to you soon.'
    });
  } catch (error) {
    return next(error);
  }
}
