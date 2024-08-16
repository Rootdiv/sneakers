import { readFile, writeFile } from 'node:fs/promises';
import { DB_FILE, DB_CART, DB_FAVORITES, DB_ORDERS } from '../const.js';

export const loadData = async () => {
  try {
    const items = await readFile(DB_FILE, 'utf8');
    const cart = await readFile(DB_CART, 'utf8');
    const favorites = await readFile(DB_FAVORITES, 'utf8');
    const orders = await readFile(DB_ORDERS, 'utf8');
    return {
      items: JSON.parse(items),
      cart: JSON.parse(cart),
      favorites: JSON.parse(favorites),
      orders: JSON.parse(orders),
    };
  } catch (err) {
    console.error('Failed to read data file:', err);
    return {
      items: [],
      cart: [],
      favorites: [],
      orders: [],
    };
  }
};

export const saveData = async (item, data) => {
  try {
    if (item === 'cart') {
      await writeFile(DB_CART, JSON.stringify(data), 'utf8');
    }
    if (item === 'favorites') {
      await writeFile(DB_FAVORITES, JSON.stringify(data), 'utf8');
    }
    if (item === 'orders') {
      await writeFile(DB_ORDERS, JSON.stringify(data), 'utf8');
    }
    return true;
  } catch (err) {
    console.error('Failed to write to orders file:', err);
    return false;
  }
};
