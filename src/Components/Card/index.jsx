import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ id, title, imageUrl, price, onFavorite, onPlus, favorite = false }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorite);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <button className={`button ${styles.favorite}`} onClick={onClickFavorite}>
        <img src={`/img/${isFavorite ? 'liked.svg' : 'unlike.svg'}`} alt={isFavorite ? 'Liked' : 'Unlike'} />
      </button>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className="button" onClick={onClickPlus}>
          <img src={`/img/btn-${isAdded ? 'checked.svg' : 'plus.svg'}`} alt="Plus" />
        </button>
      </div>
    </div>
  );
};

export default Card;
