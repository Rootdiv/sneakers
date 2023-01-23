// импорт стандартных библиотек Node.js
const { readFileSync, writeFileSync } = require('fs');
const protocol = process.env.HTTP || 'http';
const { createServer } = require(protocol);
const path = require('path');

const options = {};
if (protocol === 'https') {
  const certDir = '/etc/nginx/acme.sh';
  options['key'] = readFileSync(`${certDir}/rootdiv.ru/privkey.pem`);
  options['cert'] = readFileSync(`${certDir}/rootdiv.ru/fullchain.pem`);
}

// файл для базы данных
const DB_FILE = process.env.DB_FILE || path.resolve(__dirname, 'db.json');
// номер порта, на котором будет запущен сервер
const PORT = process.env.PORT || 1721;
// префикс URI для всех методов приложения
const URI_PREFIX = '/sneakers';

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

const getItemsList = () => {
  const sneakers = JSON.parse(readFileSync(DB_FILE) || '[]');
  return sneakers;
};

const getItems = (item = 'items') => {
  const sneakers = JSON.parse(readFileSync(DB_FILE) || '[]');
  return sneakers[item];
};

const getJsonData = req => {
  return new Promise(resolve => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(JSON.parse(data));
    });
  });
};

const createItems = (item, data) => {
  const items = getItemsList();
  items[item].push(data);
  writeFileSync(DB_FILE, JSON.stringify(items), {
    encoding: 'utf8',
  });
  return items[item];
};

const deleteItems = (item, itemId) => {
  const data = getItemsList();
  const itemIndex = data[item].findIndex(({ id }) => id === Number(itemId));
  if (itemIndex === -1) throw new ApiError(404, { message: 'Items Not Found' });
  data[item].splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(data), { encoding: 'utf8' });
  return data[item];
};

// создаём HTTP сервер, переданная функция будет реагировать на все запросы к нему
createServer(options, async (req, res) => {
  // req - объект с информацией о запросе, res - объект для управления отправляемым ответом

  // этот заголовок ответа указывает, что тело ответа будет в JSON формате
  res.setHeader('Content-Type', 'application/json');

  // CORS заголовки ответа для поддержки кросс-доменных запросов из браузера
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // запрос с методом OPTIONS может отправлять браузер автоматически для проверки CORS заголовков
  // в этом случае достаточно ответить с пустым телом и этими заголовками
  if (req.method === 'OPTIONS') {
    // end = закончить формировать ответ и отправить его клиенту
    res.end();
    return;
  }

  // если URI не начинается с нужного префикса - можем сразу отдать 404
  if (!req.url || !req.url.startsWith(URI_PREFIX)) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
    return;
  }

  const uri = req.url.substring(URI_PREFIX.length);

  try {
    // обрабатываем запрос и формируем тело ответа
    const body = await (async () => {
      if (uri === '' || uri === '/items') {
        if (req.method === 'GET') return getItems();
      }
      if (uri.includes('favorites')) {
        const [fav, itemId] = uri.substring(1).split('/');
        if (req.method === 'GET') return getItems(fav);
        if (req.method === 'POST') return createItems(fav, await getJsonData(req));
        if (req.method === 'DELETE') return deleteItems(fav, itemId);
      }
      if (uri.includes('orders')) {
        const [orders, itemId] = uri.substring(1).split('/');
        if (req.method === 'GET') return getItems(orders);
        if (req.method === 'POST') return createItems(orders, await getJsonData(req));
        if (req.method === 'DELETE') return deleteItems(orders, itemId);
      }
      if (uri.includes('cart')) {
        const [cart, itemId] = uri.substring(1).split('/');
        if (req.method === 'GET') return getItems(cart);
        if (req.method === 'POST') return createItems(cart, await getJsonData(req));
        if (req.method === 'DELETE') return deleteItems(cart, itemId);
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    // обрабатываем сгенерированную нами же ошибку
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      // если что-то пошло не так - пишем об этом в консоль и возвращаем 500 ошибку сервера
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Server Error' }));
      console.error(err);
    }
  }
})
  // выводим инструкцию, как только сервер запустился...
  .on('listening', () => {
    if (process.env.NODE_ENV !== 'https') {
      console.log(`Сервер запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
      console.log('Нажмите CTRL+C, чтобы остановить сервер');
    }
  })
  // ...и вызываем запуск сервера на указанном порту
  .listen(PORT);
