import { createApp } from './app.js';
import { env } from './config/env.js';
import { messageStore } from './services/message-store.service.js';

const app = createApp();

await messageStore.ensureStore();

app.listen(env.port, () => {
  console.log(`Portfolio backend listening on http://localhost:${env.port}`);
});
