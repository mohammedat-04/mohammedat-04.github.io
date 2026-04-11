import path from 'node:path';

export const env = {
  port: Number(process.env.PORT ?? 5000),
  allowedOrigin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:4200',
  messagesFilePath: path.resolve(process.cwd(), 'data', 'messages.json')
};
