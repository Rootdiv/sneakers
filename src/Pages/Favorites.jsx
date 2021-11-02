import React from 'react';
import Card from '../Components/Card';

const Favorites = ({ items, onAddToFavorite }) => (
  <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>Мои закладки</h1>
    </div>
    <div className="d-flex flex-wrap">
      {items.map(item => (
        <Card key={item.id} {...item} favorite={true} onFavorite={onAddToFavorite} />
      ))}
    </div>
  </div>
);

export default Favorites;
