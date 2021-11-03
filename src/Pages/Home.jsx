import React from 'react';
import Card from '../Components/Card';

const Home = ({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading }) => {
  const renderItems = () => {
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={isLoading ? index : item.id}
        onFavorite={obj => onAddToFavorite(obj)}
        onPlus={obj => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
