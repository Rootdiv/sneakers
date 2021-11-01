import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Card from './Components/Card';

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://61771dac9c328300175f57db.mockapi.io/items')
      .then(res => res.json())
      .then(json => setItems(json));
  }, []);

  const onAddToCart = obj => {
    setCartItems(prev => [...prev, obj]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map(item => (
            <Card
              key={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={obj => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
