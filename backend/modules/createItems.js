import { URI_PREFIX } from '../const.js';
import { loadData, saveData } from './dataService.js';

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

export const createItems = async (req, res) => {
  const uri = req.url.substring(URI_PREFIX.length);
  const [item] = uri.substring(1).split('/');
  const data = await getJsonData(req);
  const items = await loadData();
  if (item === 'orders') {
    const orderId = items[item].length + 1;
    items[item].push({ ...data, id: orderId });
    saveData(item, items[item]);
    res.statusCode = 200;
    res.end(JSON.stringify({ data, id: orderId }));
  } else {
    items[item].push(data);
    saveData(item, items[item]);
    res.statusCode = 200;
    res.end(JSON.stringify(items[item]));
  }
};
