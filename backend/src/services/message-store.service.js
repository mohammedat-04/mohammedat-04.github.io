import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';

class MessageStoreService {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async ensureStore() {
    await mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      await readFile(this.filePath, 'utf8');
    } catch {
      await writeFile(this.filePath, '[]\n', 'utf8');
    }
  }

  async save(message) {
    await this.ensureStore();
    const messages = await this.readAll();
    messages.unshift(message);

    await writeFile(this.filePath, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');

    return message;
  }

  async readAll() {
    await this.ensureStore();
    const content = await readFile(this.filePath, 'utf8');
    const parsed = JSON.parse(content);

    return Array.isArray(parsed) ? parsed : [];
  }
}

export const messageStore = new MessageStoreService(env.messagesFilePath);
