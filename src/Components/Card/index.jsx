import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ title, imageUrl, price, onFavorite, onPlus }) => {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heart-unlike.svg" alt="Unlike" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className={styles.button} onClick={onClickPlus}>
          <img src={`/img/btn-${isAdded ? 'checked.svg' : 'plus.svg'}`} alt="Plus" />
        </button>
      </div>
    </div>
  );
};

export default Card;