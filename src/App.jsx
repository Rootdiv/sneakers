import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';

import AppContext from './context';
//export const AppContext = React.createContext({});

const URL_MOCKAPI = 'https://61771dac9c328300175f57db.mockapi.io';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cartResponse = await axios.get(URL_MOCKAPI + '/cart');
      const itemsResponse = await axios.get(URL_MOCKAPI + '/items');
      const favoritesResponse = await axios.get(URL_MOCKAPI + '/favorites');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    };

    fetchData();
  }, []);

  const onAddToCart = obj => {
    if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`${URL_MOCKAPI}/cart/${obj.id}`);
    } else {
      axios.post(URL_MOCKAPI + '/cart', obj);
      setCartItems(prev => [...prev, obj]);
    }
  };

  const onRemoveItem = id => {
    axios.delete(`${URL_MOCKAPI}/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        axios.delete(`${URL_MOCKAPI}/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(URL_MOCKAPI + '/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = event => setSearchValue(event.target.value);

  const isItemAdded = id => cartItems.some(obj => Number(obj.id) === Number(id));

  return (
    <AppContext.Provider
      value={{ URL_MOCKAPI, items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <Route exact path="/">
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
      </div>
    </AppContext.Provider>
  );
};

export default App;
