import React, { Fragment } from 'react';

const Drawer = ({ onClose, onRemove, items = [] }) => (
  <div className="overlay">
    <div className="drawer">
      <div className="d-flex justify-between mb-30">
        <h2>Корзина</h2>
        <button className="button" onClick={onClose}>
          <img src="/img/btn-remove.svg" alt="Close" />
        </button>
      </div>
      {items.length > 0 ? (
        <Fragment>
          <div className="items">
            {items.map(obj => (
              <div key={obj.id} className="cart-item d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cart-item-img"></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <button className="remove-btn button" onClick={() => onRemove(obj.id)}>
                  <img src="/img/btn-remove.svg" alt="Remove" />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total-block">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>21 498 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1074 руб. </b>
              </li>
            </ul>
            <button className="green-button">
              Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </Fragment>
      ) : (
        <div className="cart-empty d-flex align-center justify-center flex-column flex">
          <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty" />
          <h2>Корзина пустая</h2>
          <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          <button onClick={onClose} className="green-button">
            <img src="/img/arrow.svg" alt="Arrow" />
            Вернуться назад
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Drawer;
