import { createServer } from 'node:http';
import { PORT, URI_PREFIX } from './const.js';
import { getItems } from './modules/getItems.js';
import { createItems } from './modules/createItems.js';
import { deleteItems } from './modules/deleteItems.js';

createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  if (req.method === 'GET') {
    getItems(req, res);
    return;
  }
  if (req.url.includes('favorites')) {
    if (req.method === 'POST') {
      createItems(req, res);
      return;
    }
    if (req.method === 'DELETE') {
      deleteItems(req, res);
      return;
    }
  }
  if (req.url.includes('orders')) {
    if (req.method === 'POST') {
      createItems(req, res);
      return;
    }
    if (req.method === 'DELETE') {
      deleteItems(req, res);
      return;
    }
  }
  if (req.url.includes('cart')) {
    if (req.method === 'POST') {
      createItems(req, res);
      return;
    }
    if (req.method === 'DELETE') {
      deleteItems(req, res);
      return;
    }
  }
}).listen(PORT, 'localhost', () => {
  if (process.env.PROD !== 'true') {
    console.log(`Сервер запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
    console.log('Нажмите CTRL+C, чтобы остановить сервер');
  }
});
