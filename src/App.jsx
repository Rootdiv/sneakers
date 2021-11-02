import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  useEffect(() => {
    axios.get('https://61771dac9c328300175f57db.mockapi.io/items').then(res => setItems(res.data));
    axios.get('https://61771dac9c328300175f57db.mockapi.io/cart').then(res => setCartItems(res.data));
    axios.get('https://61771dac9c328300175f57db.mockapi.io/favorites').then(res => setFavorites(res.data));
  }, []);

  const onAddToCart = obj => {
    axios.post('https://61771dac9c328300175f57db.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj]);
  };

  const onRemoveItem = id => {
    axios.delete(`https://61771dac9c328300175f57db.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://61771dac9c328300175f57db.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://61771dac9c328300175f57db.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = event => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Route exact path="/">
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>
      <Route exact path="/favorites">
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
};

export default App;
