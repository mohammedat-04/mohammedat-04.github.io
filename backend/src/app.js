import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import contactRoutes from './routes/contact.routes.js';

export function createApp() {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );
  app.use(
    cors({
      origin: env.allowedOrigin
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  app.use('/api/contact', contactRoutes);

  app.use((req, res) => {
    res.status(404).json({
      message: `Route not found: ${req.method} ${req.originalUrl}`
    });
  });

  app.use((error, _req, res, _next) => {
    console.error(error);

    res.status(500).json({
      message: 'Internal server error.'
    });
  });

  return app;
}
