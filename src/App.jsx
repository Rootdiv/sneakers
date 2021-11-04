import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Home from './Pages/Home';
import Favorites from './Pages/Favorites';
import Orders from './Pages/Orders';
import AppContext from './context';
//export const AppContext = React.createContext({});

const URL_MOCKAPI = 'https://61771dac9c328300175f57db.mockapi.io';

const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get(URL_MOCKAPI + '/cart'),
          axios.get(URL_MOCKAPI + '/favorites'),
          axios.get(URL_MOCKAPI + '/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onAddToCart = async obj => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`${URL_MOCKAPI}/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post(URL_MOCKAPI + '/cart', obj);
        setCartItems(prev =>
          prev.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const onRemoveItem = id => {
    try {
      axios.delete(`${URL_MOCKAPI}/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${URL_MOCKAPI}/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(URL_MOCKAPI + '/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onChangeSearchInput = event => setSearchValue(event.target.value);

  const isItemAdded = id => cartItems.some(obj => Number(obj.parentId) === Number(id));

  const isItemFavorite = id => favorites.some(obj => Number(obj.parentId) === Number(id));

  return (
    <AppContext.Provider
      value={{
        URL_MOCKAPI,
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
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
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
};

export default App;
