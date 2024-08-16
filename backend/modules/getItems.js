import { URI_PREFIX } from '../const.js';
import { loadData } from './dataService.js';

export const getItems = async (req, res) => {
  const uri = req.url.substring(URI_PREFIX.length);
  const [item] = uri.substring(1).split('/');
  const data = await loadData();
  res.statusCode = 200;
  res.end(JSON.stringify(data[item]));
};
