import React from 'react';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Card from './Components/Card';

const arr = [
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    imageUrl: '/img/sneakers/1.jpg',
  },
  {
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 15600,
    imageUrl: '/img/sneakers/2.jpg',
  },
  {
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    imageUrl: '/img/sneakers/3.jpg',
  },
  {
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imageUrl: '/img/sneakers/4.jpg',
  },
];

const App = () => (
  <div className="wrapper clear">
    <Drawer />
    <Header />
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Все кроссовки</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>
      <div className="d-flex">
        {arr.map((obj, i) => (
          <Card key={i} title={obj.title} price={obj.price} imageUrl={obj.imageUrl} onClick={() => console.log(obj)} />
        ))}
      </div>
    </div>
  </div>
);

export default App;
