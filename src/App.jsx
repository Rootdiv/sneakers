import React from 'react';
import Header from './Components/Header';
import Drawer from './Components/Drawer';
import Card from './Components/Card';

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
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
);

export default App;
