import { URI_PREFIX } from '../const.js';
import { loadData, saveData } from './dataService.js';

export const deleteItems = async (req, res) => {
  const uri = req.url.substring(URI_PREFIX.length);
  const [item, itemId] = uri.substring(1).split('/');
  const items = await loadData();
  const itemIndex = items[item].findIndex(({ id }) => id === Number(itemId));
  if (itemIndex === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Items Not Found' }));
    return;
  }
  items[item].splice(itemIndex, 1);
  saveData(item, items[item]);
  res.statusCode = 200;
  res.end(JSON.stringify(items[item]));
};
