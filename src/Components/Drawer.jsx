import React from 'react';

const Drawer = ({ onClose, items }) => (
  <div className="overlay">
    <div className="drawer">
      <h2 className="d-flex justify-between mb-30">
        Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
      </h2>
      <div className="items">
        {items.map((obj, i) => (
          <div key={i} className="cart-item d-flex align-center mb-20">
            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cart-item-img" />
            <div className="mr-20 flex">
              <p className="mb-5">{obj.title}</p>
              <b>{obj.price} руб.</b>
            </div>
            <img className="remove-btn" src="/img/btn-remove.svg" alt="Remove" />
          </div>
        ))}
      </div>
      <div className="cart-total-block">
        <ul>
          <li>
            <span>Итого:</span>
            <div />
            <b>21 498 руб.</b>
          </li>
          <li>
            <span>Налог 5%:</span>
            <div />
            <b>1074 руб.</b>
          </li>
        </ul>
        <button className="green-button">
          Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
);

export default Drawer;
