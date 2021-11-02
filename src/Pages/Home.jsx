import React from 'react';
import Card from '../Components/Card';

const Home = ({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart }) => (
  <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
      <div className="search-block">
        <img src="/img/search.svg" alt="Search" />
        {searchValue && (
          <button className="clear cu-p" onClick={() => setSearchValue('')}>
            <img src="/img/btn-remove.svg" alt="Clear" />
          </button>
        )}
        <input type="text" placeholder="Поиск..." value={searchValue} onChange={onChangeSearchInput} />
      </div>
    </div>
    <div className="d-flex flex-wrap">
      {items
        .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(item => (
          <Card key={item.id} {...item} onFavorite={obj => onAddToFavorite(obj)} onPlus={obj => onAddToCart(obj)} />
        ))}
    </div>
  </div>
);

export default Home;
